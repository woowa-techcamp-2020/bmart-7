import { formatPrice } from '../formatPrice'

const testList = [1000, 5000, 9000, 100000]
const answerList = ['1,000', '5,000', '9,000', '100,000']

test('formatPrice 함수 테스트', () => {
  for (let i = 0; i < testList.length; i++) {
    expect(formatPrice(testList[i])).toEqual(answerList[i])
  }
})
