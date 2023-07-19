import Head from "next/head"
import { FC } from "react";
import { Navbar, SideMenu } from "../ui";

interface Props {
  children: React.ReactNode;
  title: string;
  pageDescription: string;
  imageFulUrl?: string,
}

export const ShopLayout: FC<Props> = ({ children, title, pageDescription, imageFulUrl }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={pageDescription} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={pageDescription} />
        {
          imageFulUrl && (
            <meta name="og:image" content={imageFulUrl} />
          )

        }
      </Head>
      <nav>
        <Navbar />
      </nav>

      {/* { TODO: Sidebar } */}
      <SideMenu />

      <main style={{
        margin: '80px auto',
        maxWidth: '1440px',
        padding: '0px 30px'
      }}>
        {children}
      </main>

      {/* footer */}
      <footer>
        {/* Custom footer */}
      </footer>

    </>
  )
}
