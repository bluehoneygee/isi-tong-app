"use client";
import { AskQuestionSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const QuestionForm = () => {
  const form = useForm({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
    },
  });

  const handleCreateQuestion = () => {};
  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col gap-10 "
        onSubmit={form.handleSubmit(handleCreateQuestion)}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-[#212734] dark:text-[#f4f6f8]">
                Question Title<span className="text-[#ff7000]">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="paragraph-regular bg-[#dce3f1] dark:bg-[#151821] text-[#151821] dark:text-[#dce3f1] border-[#dce3f1] dark:border-[#212734] min-h-14 border"
                />
              </FormControl>

              <FormDescription className="body-regular text-[#7b8ec8] mt-2.5">
                Be spesific and imagine you are asking a question to another
                person
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-[#212734] dark:text-[#f4f6f8]">
                Detail explanation of your problem
                <span className="text-[#ff7000]">*</span>
              </FormLabel>
              <FormControl>Editor</FormControl>

              <FormDescription className="body-regular text-[#7b8ec8] mt-2.5">
                Introduce the problem and expand on what you have put in the
                title
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="paragraph-semibold text-[#212734] dark:text-[#f4f6f8]">
                Tags<span className="text-[#ff7000]">*</span>
              </FormLabel>
              <div>
                <Input
                  placeholder="Add tags..."
                  {...field}
                  className="paragraph-regular bg-[#dce3f1] dark:bg-[#151821] text-[#151821] dark:text-[#dce3f1] border-[#dce3f1] dark:border-[#212734] min-h-14 border"
                />
                Tags
              </div>

              <FormDescription className="body-regular text-[#7b8ec8] mt-2.5">
                Add up to 3 tags to describe what your question is about. You
                need to press enter to add a tag
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-16 flex justify-end">
          <Button type="submit" className="primary-gradient text-white w-fit">
            Ask A Question
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default QuestionForm;
