import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faSpinner,
  faBan,
  faRocket,
  faUserGroup,
  faJetFighter,
  faTrophy,
  faCodeFork,
  faTriangleExclamation,
  faUser,
  faStar,
  faLocationArrow,
  faUsers,
  faUserPlus,
  faCode,
} from "@fortawesome/free-solid-svg-icons";

const IconMap = {
  faCheck: faCheck,
  faSpinner: faSpinner,
  faBan: faBan,
  faRocket: faRocket,
  faUserGroup: faUserGroup,
  faJetFighter: faJetFighter,
  faTrophy: faTrophy,
  faCodeFork: faCodeFork,
  faTriangleExclamation: faTriangleExclamation,
  faUser: faUser,
  faStar: faStar,
  faLocationArrow: faLocationArrow,
  faUsers: faUsers,
  faUserPlus: faUserPlus,
  faCode: faCode,
} as Record<string, any>;

/**
 * 图标组件
 *
 * @param {Object} props - 组件属性
 * @param {string} props.className - 图标的类名
 * @returns {JSX.Element} 图标的 JSX 元素
 */
export function Icon({
  className,
  iconName,
}: {
  className: string;
  iconName: string;
}): JSX.Element {
  if (!iconName) {
    return <></>;
  }

  if (!IconMap[iconName] && typeof IconMap[iconName] === "function") {
    return (
      <FontAwesomeIcon
        className={className}
        icon={IconMap[iconName]}
      ></FontAwesomeIcon>
    );
  }

  if (iconName.indexOf("-") > -1) {
    iconName = iconName.replace(/[-](.)/g, (_, char) => char.toUpperCase());
  }

  if (!IconMap[iconName]) {
    return <></>;
  }

  return (
    <FontAwesomeIcon
      className={className}
      icon={IconMap[iconName]}
    ></FontAwesomeIcon>
  );
}

// export function Icon({
//     className,
//     iconName,
//   }: {
//     className: string;
//     iconName: string;
//   }): JSX.Element {
//     return <div className={className}>{iconName}</div>
//   }
