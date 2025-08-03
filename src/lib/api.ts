const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://auto-posting-backend-production.up.railway.app';

export interface GeneratingPost {
  keyword: string;
  startedAt: string;
  status: string;
  isGenerating: boolean;
}

export interface LogEntry {
  timestamp: string;
  message: string;
  level: string;
}

export interface GeneratedPost {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  status: string;
  uploaded?: boolean;
  blogUrl?: string;
}

export interface AutomationStatus {
  isRunning: boolean;
  progress: number;
  status: string;
  currentStep: number;
  totalSteps: number;
  stepDescription: string;
  currentGeneratingPost: any;
  printMessages: LogEntry[];
}

export interface NaverCredentials {
  naverId: string;
  hasPassword: boolean;
}

class ApiClient {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // 자동화 시작
  async startAutomation(data: { keyword: string; postCount: number }) {
    return this.request<{ success: boolean; message: string; taskId?: string }>('/automation/start', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // 자동화 정지
  async stopAutomation() {
    return this.request<{ success: boolean; message: string }>('/automation/stop', {
      method: 'POST',
    });
  }

  // 자동화 상태 조회
  async getStatus(): Promise<AutomationStatus> {
    return this.request<AutomationStatus>('/automation/status');
  }

  // 로그 조회
  async getLogs(): Promise<LogEntry[]> {
    return this.request<LogEntry[]>('/automation/logs');
  }

  // 로그 지우기
  async clearLogs() {
    return this.request<{ message: string }>('/automation/logs/clear', {
      method: 'DELETE',
    });
  }

  // 생성된 포스트 조회
  async getGeneratedPosts(): Promise<GeneratedPost[]> {
    return this.request<GeneratedPost[]>('/automation/posts');
  }

  // 생성 중인 포스트 조회
  async getGeneratingPost(): Promise<GeneratingPost | null> {
    return this.request<GeneratingPost | null>('/automation/generating');
  }

  // 네이버 로그인 정보 저장
  async saveNaverCredentials(naverId: string, naverPw: string) {
    return this.request<{ success: boolean; message: string }>('/naver/save-credentials', {
      method: 'POST',
      body: JSON.stringify({ naverId, naverPw }),
    });
  }

  // 네이버 로그인 정보 조회
  async getNaverCredentials(): Promise<{ success: boolean; data?: NaverCredentials; message?: string }> {
    return this.request<{ success: boolean; data?: NaverCredentials; message?: string }>('/naver/get-credentials');
  }

  // 블로그 포스트 생성
  async generateBlogPost(keyword: string) {
    return this.request<{ success: boolean; data?: any; error?: string }>('/generate', {
      method: 'POST',
      body: JSON.stringify({ keyword }),
    });
  }

  // 블로그 포스트 업로드
  async uploadBlogPost(title: string, content: string) {
    return this.request<{ success: boolean; data?: any; error?: string }>('/upload', {
      method: 'POST',
      body: JSON.stringify({ title, content }),
    });
  }
}

export const apiClient = new ApiClient(); 