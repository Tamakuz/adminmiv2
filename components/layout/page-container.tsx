import { ScrollArea } from "@/components/ui/scroll-area";

interface PageContainerProps {
  children: React.ReactNode;
  scrollable?: boolean;
}

const PageContainer = ({ children, scrollable = false }: PageContainerProps) => {
  return (
    <>
      {scrollable ? (
        <ScrollArea className="h-[calc(100vh-64px)]">
          <div className="h-full  p-4 md:px-8">{children}</div>
        </ScrollArea>
      ) : (
        <div className="h-full  p-4 md:px-8">{children}</div>
      )}
    </>
  );
};

export default PageContainer;
