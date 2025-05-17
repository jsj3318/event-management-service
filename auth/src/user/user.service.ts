import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {User} from "./user.schema";
import {Model} from "mongoose";
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import {LoginRequest} from "./dto/login-request.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    // 페이징 조회
    async findAllWithTotal(
        page = 1,
        limit = 10,
        sortBy: string = 'createdAt',
        sortOrder: 'asc' | 'desc' = 'desc',
        filter: Partial<Record<keyof User, string>> = {},
    ): Promise<{ data: User[]; total: number }> {
        const skip = (page - 1) * limit;
        const sortOption: Record<string, 1 | -1> = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

        const query = this.userModel.find(filter).sort(sortOption).skip(skip).limit(limit);
        const [data, total] = await Promise.all([
            query.exec(),
            this.userModel.countDocuments(filter).exec(),
        ]);

        return { data, total };
    }

    // _id 단건 조회
    async findById(id: string): Promise<User | null> {
        return this.userModel.findById(id).exec();
    }

    // 생성
    async create(userData: CreateUserDto): Promise<User> {
        const existingByEmail = await this.userModel.findOne({ email: userData.email });
        if (existingByEmail) {
            throw new ConflictException('이미 존재하는 이메일입니다.');
        }

        const existingByNickname = await this.userModel.findOne({ nickname: userData.nickname });
        if (existingByNickname) {
            throw new ConflictException('이미 존재하는 닉네임입니다.');
        }

        const saltRounds = 10;
        userData.password = await bcrypt.hash(userData.password, saltRounds);

        console.log('[user.service] create', userData);

        const user = new this.userModel(userData);
        return user.save();
    }

    // 로그인 요청
    async login(request: LoginRequest): Promise<{ accessToken: string }> {
        const user = await this.userModel.findOne({ email: request.email }).exec();
        if (!user) {
            throw new UnauthorizedException('존재하지 않는 이메일입니다.');
        }

        const isMatch = await bcrypt.compare(request.password, user.password);
        if (!isMatch) {
            throw new UnauthorizedException('패스워드가 일치하지 않습니다.');
        }

        const payload = { sub: user._id, email: user.email, role: user.role };
        const accessToken = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_SECRET'),
            expiresIn: '1h',
        });

        return { accessToken };
    }



}
