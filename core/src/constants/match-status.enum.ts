enum MatchStatusEnum {
    SCHEDULED = 'scheduled',
    LIVE = 'live',
    COMPLETED = 'completed',
    INTERRUPTED = 'interrupted',
}

export const MatchStatusEnumList = [
    MatchStatusEnum.COMPLETED,
    MatchStatusEnum.INTERRUPTED,
    MatchStatusEnum.LIVE,
    MatchStatusEnum.INTERRUPTED,
];

export default MatchStatusEnum;