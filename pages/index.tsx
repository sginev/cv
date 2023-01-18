import Head from 'next/head';

import { TheFooter } from '../components/TheFooter';
import { TheMain } from '../components/TheMain';
import { TheSidebar } from '../components/TheSidebar';

// import { Roboto } from '@next/font/google';
// const fontRoboto = Roboto({ weight: ['400', '500', '700', '900'], subsets: ['latin-ext'] });
// const fontNewRocker = New_Rocker({ weight: ['400'] });

type IndexProps = Awaited<ReturnType<typeof getStaticProps>>['props'];

export default function Index(props: IndexProps) {
  return (
    <>
      <Head>
        <title>Stefan Ginev — CV</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='wrapper'>
        <TheSidebar {...props} />
        <TheMain {...props} />
      </main>

      <TheFooter />
    </>
  );
}

export async function getStaticProps() {
  return { props: await loadPageContent() };
}

import fs from 'fs';
import matter from 'gray-matter';

async function loadPageContent() {
  const contentBasePath = `${process.cwd()}/content`;
  const contentPaths = {
    home: `${contentBasePath}/home.md`,
    projects: `${contentBasePath}/projects`,
    experience: `${contentBasePath}/experience`,
  };

  return {
    home: loadSingleFile(contentPaths.home),
    projects: loadFilesFromDirectory(contentPaths.projects),
    experience: loadFilesFromDirectory(contentPaths.experience),
  };
}

function loadSingleFile(filepath: string) {
  const markdownWithMetadata = fs.readFileSync(filepath, 'utf-8');
  const { data: frontmatter, content } = matter(markdownWithMetadata);
  return { frontmatter, content };
}

function loadFilesFromDirectory(dirpath: string) {
  const filenames = fs.readdirSync(dirpath, 'utf-8');
  return filenames.map(filename => loadSingleFile(`${dirpath}/${filename}`));
}

