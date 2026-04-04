import { Metadata } from 'next';
import ArticleContainer from '@/components/article/ArticleContainer';

export const metadata: Metadata = {
    title: 'The Vault Articles | HGW Editorial & Analysis',
    description: 'Explore historical sports analysis, era comparisons, and deep dives into the methodology of greatness. Read the latest insights from the HGW research team.',
    keywords: ['HGW Articles', 'Sports Analysis', 'Legend Debates', 'Era Comparisons', 'HGW Methodology', 'Historical Sports Data', 'Editorial'],
};

const ArticlePage = () => {
    return (
        <ArticleContainer />
    );
};

export default ArticlePage;