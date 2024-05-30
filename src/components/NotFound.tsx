import styles from "./styles/NotFound.module.css";

const NotFound = () => {
  return (
    <div className={styles.container}>
      <h1>Whoops! Lost in Hyperspace?</h1>
      <p>
        The page you're looking for seems to have vanished into a black hole.
      </p>
      <div className={styles.actions}>
        <a href="/" className={styles.button}>
          Take me back to the home page
        </a>
        <a href="https://www.xml-sitemaps.com/" className={styles.button}>
          Try the Sitemap to find what you need
        </a>
      </div>
      <img
        src="path/to/your/404-error.gif"
        alt="404 Error - Lost in Space"
        className={styles.image}
      />
    </div>
  );
};

export default NotFound;
