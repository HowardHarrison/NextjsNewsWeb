import { Toolbar } from 'components/toolbar';
import styles from '../../styles/Feed.module.css';
import { useRouter } from 'next/router';

export default function Feed({pageNumber, articles}) {
  let router = useRouter();
  console.log(articles);
    return articles.length ? (
      <div className='page-container'>
        <Toolbar/>
        <div className={styles.main}>
       {articles.map((article, index) => (
        <div key={index} className={styles.post}>
         <h1 onClick={() => (window.location.href = article.url)}>{article.title}</h1>
         <p>{article.description}</p>
         {!!article.urlToImage && <img onClick={() => (window.location.href = article.url)} src={article.urlToImage} />}   
        </div>
       ))}
      </div>  

      <div className={styles.paginator}>
       <div onClick={() => {
        if (pageNumber > 1) {
          router.push(`/feed/${pageNumber - 1}`).then(() => window.scrollTo(0,0));
        }
       }}
        className={pageNumber === 1 ? styles.disabled : styles.active}>Previous Page</div>

        <div>#{pageNumber}</div>

        <div onClick={() => {
        if (pageNumber < 3) {
          router.push(`/feed/${pageNumber + 1}`).then(() => window.scrollTo(0,0));
        }
       }}
        className={pageNumber === 2 ? styles.disabled : styles.active}>Next Page</div>
      </div>
      </div>
    ) : (
      <div className="page-container">
        <Toolbar />
        <div className={styles.main}>
          <h1>Oops! No articles for this page</h1>
        </div>
      </div>
    );
}

export const getServerSideProps = async pageContext => {
    const pageNumber = pageContext.query.page;

  if (!pageNumber || pageNumber < 1 || pageNumber > 5) {
    return {
     props: {
     articles: [],
     pageNumber:1,
    }
    }
  }  

  const apiRespone = await fetch(`https://newsapi.org/v2/top-headlines?sources=techcrunch&pageSize=5&page=${pageNumber}`,
  {
    headers: {
        Authorization: `Bearer ${process.env.NEXT_NEWS_KEY}`,
    },
  },
);

  const apiJson = await apiRespone.json();
  const { articles } = apiJson;

  return {
    props: {
      articles,
      pageNumber: Number.parseInt(pageNumber)
    }
  }
}
