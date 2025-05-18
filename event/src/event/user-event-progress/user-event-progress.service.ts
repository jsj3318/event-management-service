import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {UserEventProgress, UserEventProgressDocument} from "./user-event-progress.schema";
import {Model} from "mongoose";
import {EventService} from "../event/event.service";

@Injectable()
export class UserEventProgressService {
    constructor(
        @InjectModel(UserEventProgress.name) private readonly userEventProgressModel: Model<UserEventProgressDocument>,
        private readonly eventService: EventService,
    ) {
    }

    // 특정 유저의 특정 이벤트 조건 증가 시키는 함수
    async increaseConditionProgress(
        userId: string,
        eventId: string,
        type: string,
        amount: number,
    ): Promise<UserEventProgress> {
        let progress = await this.userEventProgressModel.findOne({ userId, eventId });

        // 존재하던 데이터가 없으면 기본 값으로 생성
        if (!progress) {
            const event = await this.eventService.findById(eventId);
            if (!event) throw new NotFoundException('해당하는 이벤트가 존재하지 않습니다');

            // 진행중이고 활성화 된 이벤트인지 검사
            if (event.isActive === false) {
                throw new BadRequestException('이벤트가 활성 상태가 아닙니다');
            }

            const now = new Date();
            if (now < event.startAt || now > event.endAt) {
                throw new BadRequestException('이벤트가 진행 중이 아닙니다');
            }

            progress = new this.userEventProgressModel({
                userId,
                eventId,
                conditionProgress: event.conditions.map(c => ({
                    type: c.type,
                    target: c.value,
                    current: 0,
                })),
            });
        }

        // 조건 진행도 증가
        const condition = progress.conditionProgress.find(c => c.type === type);
        if (!condition) throw new BadRequestException(`조건 ${type}을 찾을 수 없습니다`);

        condition.current = Math.min(condition.current + amount, condition.target);

        await progress.save();
        return progress;
    }


    // 특정 유저의 특정 이벤트 진행도 조회
    async getUserEventProgress(userId: string, eventId: string): Promise<UserEventProgress> {
        const progress = await this.userEventProgressModel.findOne({ userId, eventId });
        if (!progress) {
            throw new NotFoundException('해당 유저의 이벤트 진행도를 찾을 수 없습니다');
        }
        return progress;
    }


}
