"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { AnswerSchema } from "@/lib/validations";
import { useRef, useState, useTransition } from "react";
import dynamic from "next/dynamic";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { ReloadIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { createAnswer } from "@/lib/actions/answer.action";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

const Editor = dynamic(() => import("@/components/editor"), {
  // Make sure we turn SSR off
  ssr: false,
});

interface Props {
  questionId: string;
  questionTitle: string;
  questionContent: string;
}

const AnswerForm = ({ questionId, questionTitle, questionContent }: Props) => {
  const [isAnswering, startAnsweringTransition] = useTransition();
  const [isAISubmitting, setisAISubmitting] = useState(false);
  const session = useSession();

  const editorRef = useRef<MDXEditorMethods>(null);

  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      content: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof AnswerSchema>) => {
    startAnsweringTransition(async () => {
      const result = await createAnswer({
        questionId,
        content: values.content,
      });

      if (result.success) {
        form.reset();
        toast.success("Your answer has been posted successfully");

        if (editorRef.current) {
          editorRef.current.setMarkdown("");
        }
      } else {
        toast.error(`Error ${result.status}`, {
          description: result?.error?.message ?? "Something went wrong",
        });
      }
    });
  };

  const generateAIAnswer = async () => {
    if (session.status !== "authenticated") {
      return toast.error("Please log in", {
        description: "You need to be logged in to use this feature",
      });
    }

    setisAISubmitting(true);
    try {
      const { success, data, error } = await api.ai.getAnswer(
        questionTitle,
        questionContent
      );

      if (!success || !data) {
        return toast.error("Error", {
          description: error?.message || "Failed to generate answer",
        });
      }

      const formattedAnswer = data.replace(/<br>/g, " ").toString().trim();
      console.log("AI formattedAnswer:", formattedAnswer);

      form.setValue("content", formattedAnswer, {
        shouldDirty: true,
        shouldValidate: true,
      });
      console.log("Form content value:", form.getValues("content"));
      form.trigger("content");

      let attempts = 0;
      const applyMarkdown = () => {
        const editor = editorRef.current;
        if (!editor) {
          attempts += 1;
          console.log("Editor ref not ready yet, attempt", attempts);
          if (attempts <= 5) {
            setTimeout(applyMarkdown, 150);
          } else {
            console.log("Editor ref not ready after retries");
          }
          return;
        }
        editor.setMarkdown(formattedAnswer);
        console.log(
          "Editor markdown after setMarkdown:",
          editor.getMarkdown()
        );
      };

      applyMarkdown();
      requestAnimationFrame(applyMarkdown);

      toast.success("AI answer has been generated");
    } catch (error) {
      toast.error("Failed to generate AI answer", {
        description:
          error instanceof Error ? error.message : "Something went wrong",
      });
    } finally {
      setisAISubmitting(false);
    }
  };
  return (
    <div>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <h4 className="paragraph-semibold text-[#212734] dark:text-[#f4f6f8]">
          {" "}
          Write your answer here
        </h4>
        <Button
          className="bg-[#f4f6f8] dark:bg-[#151821]  border-[#dce3f1] dark:border-[#212734] gap-1.5 border rounded-md px-4 py-2.5 text-[#ff7000]"
          disabled={isAISubmitting}
          type="button"
          onClick={generateAIAnswer}
        >
          {isAISubmitting ? (
            <>
              <ReloadIcon className="mr-2 size-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Image
                src="/icons/stars.svg"
                alt="Generate Ai Answer"
                width={12}
                height={12}
                className="object-contain"
              />{" "}
              Generate AI Answer
            </>
          )}
        </Button>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="mt-6 w-full flex-col gap-10"
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormControl className="mt-3.5">
                  <Editor
                    value={field.value}
                    editorRef={editorRef}
                    fieldChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button type="submit" className="primary-gradient w-fit">
              {isAnswering ? (
                <>
                  <ReloadIcon className="mr-2 size-4 animate-spin" />
                  Posting...
                </>
              ) : (
                "Post Answer"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AnswerForm;
