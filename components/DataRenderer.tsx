import { DEFAULT_EMPTY, DEFAULT_ERROR } from "@/constants/states";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

interface Props<T> {
  success: boolean;
  error?: {
    message: string;
    details?: Record<string, string[]>;
  };
  data: T[] | null | undefined;
  empty: {
    title: string;
    message: string;
    button?: {
      text: string;
      href: string;
    };
  };
  render: (data: T[]) => React.ReactNode;
}

interface StateSkeletonProps {
  image: {
    light: string;
    dark: string;
    alt: string;
  };
  title: string;
  message: string;
  button?: {
    text: string;
    href: string;
  };
}

const StateSkeleton = ({
  image,
  title,
  message,
  button,
}: StateSkeletonProps) => (
  <div className="mt-16 flex w-full flex-col items-center justify-center  sm:mt-24">
    <>
      <Image
        src={image.dark}
        alt={image.alt}
        width={270}
        height={200}
        className="hidden object-contain dark:block"
      />
      <Image
        src={image.light}
        alt={image.alt}
        width={270}
        height={200}
        className="block object-contain dark:hidden"
      />
    </>
    <h2 className="h2-bold text-[#0f1117] dark:text-white mt-8">{title}</h2>
    <p className="body-regular text-[#101012] dark:text-[#dce3f1] my-3.5 max-w-md text-center">
      {message}
    </p>
    {button && (
      <Link href={button.href}>
        <Button className="paragraph-medium mt-5 min-h-[46px] rounded-lg bg-[#ff7000] px-4 py-3 text-white hover:bg-[#ff7000]">
          {button.text}
        </Button>
      </Link>
    )}
  </div>
);

const DataRenderer = <T,>({
  success,
  error,
  data,
  empty = DEFAULT_EMPTY,
  render,
}: Props<T>) => {
  if (!success) {
    return (
      <StateSkeleton
        image={{
          light: "/light-error.png",
          dark: "/dark-error.png",
          alt: "Error state illustration",
        }}
        title={error?.message || DEFAULT_ERROR.title}
        message={
          error?.details
            ? JSON.stringify(error.details, null, 2)
            : DEFAULT_ERROR.message
        }
        button={DEFAULT_ERROR.button}
      />
    );
  }
  if (!data || data.length === 0)
    return (
      <StateSkeleton
        image={{
          light: "/light-illustration.png",
          dark: "/dark-illustration.png",
          alt: "Empty state illustration",
        }}
        title={empty.title}
        message={empty.message}
        button={empty.button}
      />
    );

  return <div>{render(data)}</div>;
};

export default DataRenderer;
