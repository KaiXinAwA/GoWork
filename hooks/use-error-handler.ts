import { useToast } from '@/hooks/use-toast';

interface ErrorOptions {
  defaultMessage?: string;
  logError?: boolean;
}

export function useErrorHandler(options: ErrorOptions = {}) {
  const { toast } = useToast();
  const defaultMessage = options.defaultMessage || '操作失败，请稍后重试';
  const logError = options.logError !== false;

  const handleError = (error: unknown): string => {
    // 获取错误消息
    const errorMessage = error instanceof Error 
      ? error.message 
      : (typeof error === 'string' ? error : defaultMessage);
    
    // 记录错误
    if (logError) {
      console.error('Error occurred:', error);
    }
    
    // 显示友好的错误提示
    toast({
      title: '出错了',
      description: errorMessage,
      variant: 'destructive',
    });
    
    return errorMessage;
  };

  return { handleError };
}