import ReusableSmallForm from "@/components/ReusableSmallForm/ReusableSmallForm";

export default function Home() {
  return (
    <>
      <div className="ml-96 flex justify-center">
        <ReusableSmallForm entityType={"característica"} />
      </div>
    </>
  );
}
