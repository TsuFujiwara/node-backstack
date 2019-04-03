import Header from "../components/Header";
import Link from "next/link";

export default () => (
  <div>
    <Header />
    <Link href="/">
      <a>back</a>
    </Link>
  </div>
);
