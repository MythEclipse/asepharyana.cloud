// ModalWrapper.tsx

'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { MouseEventHandler, ReactNode, KeyboardEvent } from 'react';
import { useState } from 'react';

type ModalWrapperProps = {
  children: ReactNode;
  title?: string; // Title is optional
};

export default function ModalWrapper({ children, title }: ModalWrapperProps) {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(true);

  // Function to close the modal
  const closeModal = () => {
    setOpenModal(false);
    router.back();
  };

  // Handle overlay click
  const handleOverlayClick: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  // Handle escape key
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  };

  return (
    <>
      {openModal && (
        <div
          className="fixed inset-0 z-51 flex items-center justify-center overflow-auto bg-black bg-opacity-50"
          onClick={handleOverlayClick}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div
            className="bg-white dark:bg-darka rounded-lg shadow-lg p-6 max-w-5xl w-full mx-4 sm:mx-6 lg:mx-8 xl:mx-12 max-h-screen overflow-auto"
            role="dialog"
            aria-labelledby="modal-title"
            aria-modal="true"
          >
            <div className="mb-4">
              {title && (
                <h3 id="modal-title" className="text-xl font-semibold">
                  {title}
                </h3>
              )}
            </div>
            <div className="modal-body">{children}</div>
            <button
              type="button"
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
              onClick={closeModal}
              aria-label="Close modal"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
}
