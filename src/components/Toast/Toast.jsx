import * as React from "react";
import * as Toast from '@radix-ui/react-toast';
import { X } from '@phosphor-icons/react';
import { z } from 'zod';

const toastSchema = z.object({
  children: z.any(),
  duration: z.number().default(5000),
  showToast: z.boolean().optional(),
});

const ToastComponent = ({ children, duration = 5000, showToast = false }) => {
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
            {children}
          </div>
          <Toast.Close
            className="text-gray-400 hover:text-gray-600 rounded-lg p-1 hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <X size={16} weight="bold" />
          </Toast.Close>
        </div>
      </Toast.Root>

      <Toast.Viewport className="fixed bottom-0 right-0 flex flex-col p-4 gap-2 w-[400px] max-w-[100vw] m-0 list-none z-50 outline-none" />
    </Toast.Provider>
  );
};

export { ToastComponent as Toast, toastSchema }; 