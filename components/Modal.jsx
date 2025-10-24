"use client";

import React, { use, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Modal = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
        <button onClick={()=>setOpen(true)}>Click Me</button>
      <Dialog open={open} onOpenChange={setOpen}>
        {/*The open and onOpenChange 
        <DialogTrigger>Click Me</DialogTrigger>*/}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default Modal;
