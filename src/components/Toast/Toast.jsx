import * as React from "react";
import * as Toast from '@radix-ui/react-toast';
import { X } from '@phosphor-icons/react';
import { z } from 'zod';

const toastSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  action: z.object({
    label: z.string(),
    onClick: z.function(),
  }).optional(),
  duration: z.number().default(5000),
  showToast: z.boolean().optional(),
});

const ToastComponent = ({ title, description, action, duration = 5000, showToast = false }) => {
  const [open, setOpen] = React.useState(false);
  const timerRef = React.useRef(null);

  React.useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  React.useEffect(() => {
    if (showToast) {
      handleShowToast();
    }
  }, [showToast]);

  const handleShowToast = () => {
    setOpen(false);
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setOpen(true);
    }, 100);
  };

  return (
    <Toast.Provider swipeDirection="right" duration={duration}>
      <Toast.Root
        open={open}
        onOpenChange={setOpen}
        className={`
          bg-white rounded-lg shadow-lg p-4
          data-[state=open]:animate-slideIn
          data-[state=closed]:animate-hide
          data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]
          data-[swipe=cancel]:translate-x-0
          data-[swipe=end]:animate-swipeOut
          border border-gray-200
          fixed bottom-4 right-4
          w-[380px]
        `}
      >
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <Toast.Title className="text-gray-900 font-semibold text-sm mb-1">
              {title}
            </Toast.Title>
            {description && (
              <Toast.Description className="text-gray-600 text-sm">
                {description}
              </Toast.Description>
            )}
          </div>
          <Toast.Close
            className="text-gray-400 hover:text-gray-600 rounded-lg p-1 hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <X size={16} weight="bold" />
          </Toast.Close>
        </div>

        {action && (
          <Toast.Action
            altText={action.label}
            className="mt-3 inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors"
            onClick={action.onClick}
          >
            {action.label}
          </Toast.Action>
        )}
      </Toast.Root>

      <Toast.Viewport className="fixed bottom-0 right-0 flex flex-col p-4 gap-2 w-[400px] max-w-[100vw] m-0 list-none z-50 outline-none" />
    </Toast.Provider>
  );
};

export { ToastComponent as Toast, toastSchema }; 