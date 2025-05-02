import { ClassEnum } from 'class-enum';

export class HotsMap extends ClassEnum<HotsMap> {
  static readonly 블랙하트_항만 = new HotsMap(
    'blackhearts_bay',
    '블랙하트 항만',
  );
  static readonly 용의_둥지 = new HotsMap('dragon_shire', '용의 둥지');
  static readonly 저주받은_골짜기 = new HotsMap(
    'cursed_hollow',
    '저주받은 골짜기',
  );
  static readonly 죽음의_광산 = new HotsMap('haunted_mines', '죽음의 광산');
  static readonly 공포의_정원 = new HotsMap('garden_of_terror', '공포의 정원');
  static readonly 하늘_사원 = new HotsMap('sky_temple', '하늘 사원');
  static readonly 거미_여왕의_무덤 = new HotsMap(
    'tomb_of_the_spider_queen',
    '거미 여왕의 무덤',
  );
  static readonly 영원의_전쟁터 = new HotsMap(
    'battlefield_of_eternity',
    '영원의 전쟁터',
  );
  static readonly 불지옥_신단 = new HotsMap('infernal_shrine', '불지옥 신단');
  static readonly 파멸의_탑 = new HotsMap('towers_of_doom', '파멸의 탑');
  static readonly 브락시스_항전 = new HotsMap(
    'braxis_holdout',
    '브락시스 항전',
  );
  static readonly 하나무라_사원 = new HotsMap(
    'hanamura_temple',
    '하나무라 사원',
  );
  static readonly 볼스카야_공장 = new HotsMap(
    'volskaya_foundry',
    '볼스카야 공장',
  );
  static readonly 알터랙_고개 = new HotsMap('alterac_pass', '알터랙 고개');

  constructor(
    readonly value: string,
    private readonly title: string,
  ) {
    super(value);
  }

  getTitle(): string {
    return this.title;
  }
}
