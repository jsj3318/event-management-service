import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import {User} from "./user.schema";
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import * as bcrypt from 'bcrypt';


describe('UserService', () => {
  let service: UserService;

  const mockUser = { _id: 'abc123', email: 'user@test.com', password: 'hashed', role: 'USER' };

  const execMock = jest.fn().mockResolvedValue(mockUser);
  const selectMock = jest.fn().mockReturnValue({ exec: execMock });
  const userModelMock = {
    findById: jest.fn().mockReturnValue({ select: selectMock }),
    findOne: jest.fn(),
  };

  const jwtServiceMock = {
    sign: jest.fn(() => 'mocked-jwt-token'),
    verify: jest.fn(),
  };

  const configServiceMock = {
    get: jest.fn((key) => 'some-value'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getModelToken(User.name), useValue: userModelMock },
        { provide: JwtService, useValue: jwtServiceMock },
        { provide: ConfigService, useValue: configServiceMock },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('유저 한개 반환', async () => {
    const user = await service.findById('abc123');
    expect(user).toEqual(mockUser);
    expect(userModelMock.findById).toHaveBeenCalledWith('abc123');
  });

  it('NotFoundException 던짐', async () => {
    execMock.mockResolvedValueOnce(null);
    await expect(service.findById('nonexistent-id')).rejects.toThrow('유저를 찾을 수 없습니다.');
    expect(userModelMock.findById).toHaveBeenCalledWith('nonexistent-id');
  });

  describe('login', () => {
    const loginRequest = { email: 'user@test.com', password: 'plainPassword' };

    it('정상 로그인 시 accessToken 반환', async () => {
      userModelMock.findOne = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockUser),
      });
      jest.spyOn(bcrypt as any, 'compare').mockResolvedValue(true);

      const token = await service.login(loginRequest);

      expect(token).toHaveProperty('accessToken');
      expect(jwtServiceMock.sign).toHaveBeenCalledWith(
          { sub: mockUser._id, email: mockUser.email, role: mockUser.role },
          expect.objectContaining({ secret: 'some-value', expiresIn: '1h' }),
      );
    });

    it('존재하지 않는 이메일 → NotFoundException 발생', async () => {
      userModelMock.findOne = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      await expect(service.login(loginRequest)).rejects.toThrow('존재하지 않는 이메일입니다.');
    });

    it('비밀번호 불일치 → UnauthorizedException 발생', async () => {
      userModelMock.findOne = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockUser),
      });
      jest.spyOn(bcrypt as any, 'compare').mockResolvedValue(false);

      await expect(service.login(loginRequest)).rejects.toThrow('패스워드가 일치하지 않습니다.');
    });
  });

});
