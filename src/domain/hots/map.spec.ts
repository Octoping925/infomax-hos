import { HotsMap } from './map';

test('value로 맵을 찾을 수 있다', () => {
  const map = HotsMap.valueOf<HotsMap>('블랙하트_항만');
  expect(map).toBe(HotsMap.블랙하트_항만);
});

test('values로 모든 맵을 찾을 수 있다', () => {
  const maps = HotsMap.values<HotsMap>();
  expect(maps.length).toBe(HotsMap.values().length);
});
