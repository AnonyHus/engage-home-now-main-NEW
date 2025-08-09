import React from "react";
import { Link } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  to?: string; // If undefined, it's the current page
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <div className="pt-24 bg-white dark:bg-dark">
      <div className="container">
        <div className="w-full mb-8">
          <div className="py-4 border-b border-stroke dark:border-dark-3 md:py-5">
            <ul className="flex items-center">

              {items.map((item, index) => {
                const isLast = index === items.length - 1;

                return (
                  <li className="flex items-center" key={index}>
                    {!isLast && item.to ? (
                      <>
                        <Link
                          to={item.to}
                          className="flex items-center text-base font-medium hover:text-primary dark:text-dark-6 dark:hover:text-primary text-body-color"
                        >
                          {index === 0 && (
                            <span className="pr-2">
                              {/* Home icon */}
                              <svg
                                width="15"
                                height="15"
                                viewBox="0 0 15 15"
                                className="fill-current"
                              >
                                <path d="M13.3503 14.6503H10.2162C9.51976 14.6503 8.93937 14.0697 8.93937 13.3729V10.8182C8.93937 10.5627 8.73043 10.3537 8.47505 10.3537H6.54816C6.29279 10.3537 6.08385 10.5627 6.08385 10.8182V13.3497C6.08385 14.0464 5.50346 14.627 4.80699 14.627H1.62646C0.929989 14.627 0.349599 14.0464 0.349599 13.3497V5.24431C0.349599 4.89594 0.535324 4.5708 0.837127 4.385L6.96604 0.506501C7.29106 0.297479 7.73216 0.297479 8.05717 0.506501L14.1861 4.385C14.4879 4.5708 14.6504 4.89594 14.6504 5.24431V13.3265C14.6504 14.0697 14.07 14.6503 13.3503 14.6503Z" />
                              </svg>
                            </span>
                          )}
                          {item.label}
                        </Link>
                        <span className="px-3 text-body-color dark:text-dark-6">
                          {/* Arrow icon */}
                          <svg
                            width="7"
                            height="12"
                            viewBox="0 0 7 12"
                            className="fill-current"
                          >
                            <path d="M0.879 11.435c-.07 0-.159-.035-.212-.088a.223.223 0 0 1-.017-.294L5.098 6.175a.173.173 0 0 0 0-.244L0.649 1.091a.223.223 0 0 1 .317-.317l4.448 4.731c.3.336.3.866 0 1.184L0.967 11.329a.223.223 0 0 1-.088.017Z" />
                          </svg>
                        </span>
                      </>
                    ) : (
                      <span className="text-base font-medium text-dark dark:text-white">
                        {item.label}
                      </span>
                    )}
                  </li>
                );
              })}

            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
