import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Breadcrumb.module.css";

export default function Breadcrumb() {
  const router = useRouter();
  const pathSegments = router.asPath.split("/").filter((seg) => seg);

  return (
    <nav aria-label="breadcrumb" className={styles.nav}>
      <ol className={styles.breadcrumb}>
        <li className={styles.item}>
          <Link href="/">Home</Link>
        </li>
        {pathSegments.map((segment, index) => {
          const href = "/" + pathSegments.slice(0, index + 1).join("/");
          const isLast = index === pathSegments.length - 1;
          const label = segment.charAt(0).toUpperCase() + segment.slice(1);

          return (
            <li
              key={href}
              className={`${styles.item} ${isLast ? styles.active : ""}`}
              aria-current={isLast ? "page" : undefined}
            >
              {isLast ? label : <Link href={href}>{label}</Link>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
