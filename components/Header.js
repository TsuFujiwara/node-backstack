// クライアント側でリンクを作るためのLinkコンポーネント
// サーバへはリクエストなしにリンクへ移動できる
import Link from "next/link";

const linkStyle = {
  marginRight: 15
};

const Header = () => (
  <div>
    <Link href="/">
      <a style={linkStyle}>Home</a>
    </Link>
    <Link href="/a">
      <a style={linkStyle}>a</a>
    </Link>
    <Link href="/b">
      <a style={linkStyle}>b</a>
    </Link>
    <Link
      style={linkStyle}
      href={{ pathname: "/posts", query: { id: "2" } }}
      as="/posts/2"
    >
      <a>post #2</a>
    </Link>
  </div>
);

export default Header;
