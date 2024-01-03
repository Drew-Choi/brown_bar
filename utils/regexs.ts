export const REGEX = {
  // 숫자로 시작해서 숫자로 끝나는 것만 + 빈문자 허용
  onlyNumCheck: /^\d*$/,

  // 숫자로 시작해서 숫자로 끝나는 것만 + 빈문자 허용
  onlyNumAndCommaCheck: /^[\d,]*$/,

  // 숫자와 ''빈 문자열이 아닌걸 찾아냄
  notNumEmptyStringRemove: /[^0-9\s]/g,

  onlyTextCheck_Kor_Eng: /^[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z\s]*$/,

  // 비밀번호 영문,숫자,특수문자 8자리 이상 15자리 이하
  password: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/,
};

export const isRegexCheck = ({
  value,
  pattern = REGEX.onlyNumCheck,
  fn,
  checkLengthOpt: { length, comparison } = {},
}: {
  value: string;
  pattern?: RegExp;
  fn: (value: string) => void;
  checkLengthOpt?: {
    length?: number;
    comparison?: '>' | '<' | '>=' | '<=' | '===';
  };
}) => {
  let checkLengthResult = true;

  if (length && comparison) {
    switch (comparison) {
      case '>':
        checkLengthResult = value.length > length;
        break;
      case '<':
        checkLengthResult = value.length < length;
        break;
      case '>=':
        checkLengthResult = value.length >= length;
        break;
      case '<=':
        checkLengthResult = value.length <= length;
        break;
      case '===':
        checkLengthResult = value.length === length;
        break;
      default:
        throw new Error('The formula(comparison) is not accurate');
    }
  }
  if ((pattern.test(value) || '') && checkLengthResult) {
    fn(value);
  }
};
