"use client";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { deleteQuestion } from "@/lib/actions/question.action";

interface Props {
  type: string;
  itemId: string;
}
const EditDeleteAction = ({ type, itemId }: Props) => {
  const router = useRouter();
  const handleEdit = () => {
    router.push(`/questions/${itemId}/edit`);
  };
  const handleDelete = async () => {
    if (type === "Question") {
      await deleteQuestion({ questionId: itemId });
      toast.success("Pertanyaan berhasil dihapus"),
        {
          description: "Pertanyaan kamu telah dihapus secara permanen",
        };
    } else if (type === "Answer") {
      //handle api delete answer
      toast.success("Jawaban berhasil dihapus"),
        {
          description: "Jawaban kamu telah dihapus secara permanen",
        };
    }
  };
  return (
    <div className="flex items-center justify-end gap-3 max-sm:w-full">
      {type === "Question" && (
        <Image
          src="/icons/edit.svg"
          width={14}
          height={14}
          alt="edit"
          className="cursor-pointer object-contain"
          onClick={handleEdit}
        />
      )}

      <AlertDialog>
        <AlertDialogTrigger className="cursor-pointer">
          <Image src="/icons/trash.svg" alt="trash" width={14} height={14} />
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-[#f4f6f8] dark:bg-[#151821]">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Apakah kamu yakin ingin menghapus ini?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Ini akan menghapus
              {type === "Question" ? "pertanyaan" : "jawaban"} kamu secara
              permanen dari server kami.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-[#f4f6f8] dark:bg-[#151821]">
              Batal
            </AlertDialogCancel>
            <AlertDialogAction
              className="border-[#fff1e6] bg-[#ff7000] text-[#f4f6f8]"
              onClick={handleDelete}
            >
              Lanjutkan
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default EditDeleteAction;
