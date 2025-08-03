// 로컬 스토리지 유틸리티
export const storage = {
  get: (key: string): string | null => {
    if (typeof window === 'undefined') return null;
    try {
      return localStorage.getItem(key);
      } catch {
    console.error('localStorage 접근 오류');
    return null;
  }
  },

  set: (key: string, value: string): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error('localStorage 저장 오류:', error);
    }
  },

  remove: (key: string): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('localStorage 삭제 오류:', error);
    }
  },

  clear: (): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.clear();
    } catch (error) {
      console.error('localStorage 초기화 오류:', error);
    }
  }
};

// 날짜 포맷팅 유틸리티
export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  } catch (error) {
    return dateString;
  }
};

// 텍스트 길이 제한 유틸리티
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// 로그 레벨에 따른 색상 유틸리티
export const getLogLevelColor = (level: string): string => {
  switch (level.toLowerCase()) {
    case 'error':
      return 'text-red-600';
    case 'warning':
      return 'text-yellow-600';
    case 'success':
      return 'text-green-600';
    case 'info':
    default:
      return 'text-blue-600';
  }
};

// 진행률 계산 유틸리티
export const calculateProgress = (current: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((current / total) * 100);
};

// 키워드 유효성 검사
export const validateKeyword = (keyword: string): boolean => {
  return keyword.trim().length > 0 && keyword.trim().length <= 100;
};

// 네이버 아이디 유효성 검사
export const validateNaverId = (id: string): boolean => {
  // 네이버 아이디는 4-20자 영문, 숫자, 언더스코어만 허용
  const naverIdRegex = /^[a-zA-Z0-9_]{4,20}$/;
  return naverIdRegex.test(id);
};

// 비밀번호 유효성 검사
export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
}; 