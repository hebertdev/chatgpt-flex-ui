import { getToken } from "@/helpers/auth";
import { HomeLogin } from "@/components/pages/home/HomeLogin";
import { HomeGuest } from "@/components/pages/home/HomeGuest";

export default function Home() {
  return <>{getToken() ? <HomeLogin /> : <HomeGuest />}</>;
}
