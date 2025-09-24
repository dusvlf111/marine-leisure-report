import React from 'react';
import { cn } from '@/lib/utils';
import { 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  Info, 
  X 
} from 'lucide-react';

interface AlertProps {
  type?: 'success' | 'warning' | 'error' | 'info';
  title?: string;
  message: string;
  animate?: boolean;
  closeable?: boolean;
  onClose?: () => void;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  type = 'info',
  title,
  message,
  animate = true,
  closeable = false,
  onClose,
  className,
}) => {
  const baseClasses = 'p-4 rounded-lg border flex items-start space-x-3';
  
  const typeConfig = {
    success: {
      containerClasses: 'bg-green-50 border-green-200 text-green-800',
      iconClasses: 'text-green-400',
      Icon: CheckCircle,
      animationClass: animate ? 'success-message' : '',
    },
    warning: {
      containerClasses: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      iconClasses: 'text-yellow-400',
      Icon: AlertCircle,
      animationClass: animate ? 'safety-caution' : '',
    },
    error: {
      containerClasses: 'bg-red-50 border-red-200 text-red-800',
      iconClasses: 'text-red-400',
      Icon: XCircle,
      animationClass: animate ? 'safety-denied' : '',
    },
    info: {
      containerClasses: 'bg-blue-50 border-blue-200 text-blue-800',
      iconClasses: 'text-blue-400',
      Icon: Info,
      animationClass: animate ? 'safety-approved' : '',
    },
  };

  const config = typeConfig[type];
  const { Icon } = config;

  return (
    <div
      className={cn(
        baseClasses,
        config.containerClasses,
        config.animationClass,
        className
      )}
    >
      <Icon className={cn('w-5 h-5 mt-0.5 flex-shrink-0', config.iconClasses)} />
      
      <div className="flex-1 min-w-0">
        {title && (
          <h4 className="font-medium mb-1">
            {title}
          </h4>
        )}
        <p className={cn('text-sm', title ? '' : 'font-medium')}>
          {message}
        </p>
      </div>

      {closeable && onClose && (
        <button
          onClick={onClose}
          className={cn(
            'flex-shrink-0 ml-auto pl-3',
            'hover:opacity-75 focus:outline-none focus:opacity-75',
            config.iconClasses
          )}
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

interface AlertListProps {
  alerts: Array<{
    id: string;
    type: 'success' | 'warning' | 'error' | 'info';
    title?: string;
    message: string;
  }>;
  onDismiss?: (id: string) => void;
  className?: string;
}

export const AlertList: React.FC<AlertListProps> = ({
  alerts,
  onDismiss,
  className,
}) => {
  if (alerts.length === 0) return null;

  return (
    <div className={cn('space-y-3', className)}>
      {alerts.map((alert) => (
        <Alert
          key={alert.id}
          type={alert.type}
          title={alert.title}
          message={alert.message}
          closeable={!!onDismiss}
          onClose={() => onDismiss?.(alert.id)}
          animate={true}
        />
      ))}
    </div>
  );
};

interface AlertBannerProps {
  type: 'success' | 'warning' | 'error' | 'info';
  message: string;
  permanent?: boolean;
  className?: string;
}

export const AlertBanner: React.FC<AlertBannerProps> = ({
  type,
  message,
  permanent = false,
  className,
}) => {
  const typeClasses = {
    success: 'bg-green-600 text-white',
    warning: 'bg-yellow-600 text-white',
    error: 'bg-red-600 text-white',
    info: 'bg-blue-600 text-white',
  };

  return (
    <div
      className={cn(
        'px-4 py-2 text-center text-sm font-medium',
        typeClasses[type],
        !permanent && 'animate__animated animate__slideInDown',
        className
      )}
    >
      {message}
    </div>
  );
};
