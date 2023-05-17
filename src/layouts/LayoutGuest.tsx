//components
import HeaderGuest from "@/components/header/HeaderGuest";

interface Props {
  children: JSX.Element | JSX.Element[];
}

export function LayoutGuest({ children }: Props) {
  return (
    <>
      <HeaderGuest />
      {children}
    </>
  );
}
