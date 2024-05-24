"use client";
import { useRouter } from "next/navigation";
import { MouseEventHandler, ReactNode, KeyboardEvent, useRef } from "react";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { useEffect } from "react";
export default function ModalWraper({ children }: { children: ReactNode }) {
  const overlay = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [openModal, setOpenModal] = useState(true);
  const close: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.currentTarget === e.target) {
      router.back();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      router.back();
    }
  };

  return (
    <>
    <Modal show={openModal} onClose={() => setOpenModal(false)}>
      <Modal.Header>Product</Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
      
    </Modal>
  </>
  );
}