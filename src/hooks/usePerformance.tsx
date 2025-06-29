import { useEffect } from "react";

interface PerformanceMetric {
  name: string;
  value: number;
  rating: "good" | "needs-improvement" | "poor";
}

export const usePerformance = () => {
  useEffect(() => {
    // Core Web Vitals monitoring
    const observePerformance = () => {
      // First Contentful Paint (FCP)
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === "paint") {
            const metric: PerformanceMetric = {
              name: entry.name,
              value: entry.startTime,
              rating:
                entry.startTime < 1800
                  ? "good"
                  : entry.startTime < 3000
                  ? "needs-improvement"
                  : "poor",
            };
            console.log("Paint Metric:", metric);
          }
        }
      });

      observer.observe({ entryTypes: ["paint"] });

      // Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (lastEntry) {
          const metric: PerformanceMetric = {
            name: "largest-contentful-paint",
            value: lastEntry.startTime,
            rating:
              lastEntry.startTime < 2500
                ? "good"
                : lastEntry.startTime < 4000
                ? "needs-improvement"
                : "poor",
          };
          console.log("LCP Metric:", metric);
        }
      });

      lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });

      // Cumulative Layout Shift (CLS)
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        }
        const metric: PerformanceMetric = {
          name: "cumulative-layout-shift",
          value: clsValue,
          rating:
            clsValue < 0.1
              ? "good"
              : clsValue < 0.25
              ? "needs-improvement"
              : "poor",
        };
        console.log("CLS Metric:", metric);
      });

      clsObserver.observe({ entryTypes: ["layout-shift"] });

      // First Input Delay (FID) - needs user interaction
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const metric: PerformanceMetric = {
            name: "first-input-delay",
            value: (entry as any).processingStart - entry.startTime,
            rating:
              (entry as any).processingStart - entry.startTime < 100
                ? "good"
                : (entry as any).processingStart - entry.startTime < 300
                ? "needs-improvement"
                : "poor",
          };
          console.log("FID Metric:", metric);
        }
      });

      fidObserver.observe({ entryTypes: ["first-input"] });

      // Time to Interactive approximation
      const navigation = performance.getEntriesByType(
        "navigation"
      )[0] as PerformanceNavigationTiming;
      if (navigation) {
        const tti = navigation.domInteractive - navigation.fetchStart;
        const metric: PerformanceMetric = {
          name: "time-to-interactive",
          value: tti,
          rating:
            tti < 3800 ? "good" : tti < 7300 ? "needs-improvement" : "poor",
        };
        console.log("TTI Metric:", metric);
      }

      // Memory usage monitoring
      if ("memory" in performance) {
        const memoryInfo = (performance as any).memory;
        console.log("Memory Usage:", {
          usedJSHeapSize: memoryInfo.usedJSHeapSize,
          totalJSHeapSize: memoryInfo.totalJSHeapSize,
          jsHeapSizeLimit: memoryInfo.jsHeapSizeLimit,
        });
      }

      // Network information
      if ("connection" in navigator) {
        const connection = (navigator as any).connection;
        console.log("Network Info:", {
          effectiveType: connection.effectiveType,
          downlink: connection.downlink,
          rtt: connection.rtt,
        });
      }
    };

    // Start observing after page load
    if (document.readyState === "complete") {
      observePerformance();
    } else {
      window.addEventListener("load", observePerformance);
    }

    return () => {
      window.removeEventListener("load", observePerformance);
    };
  }, []);

  // Performance optimization utilities
  const prefetchRoute = (route: string) => {
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.href = route;
    document.head.appendChild(link);
  };

  const preloadCriticalResource = (
    url: string,
    type: "script" | "style" | "image" = "script"
  ) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.href = url;
    if (type === "script") link.as = "script";
    if (type === "style") link.as = "style";
    if (type === "image") link.as = "image";
    document.head.appendChild(link);
  };

  const measureFunctionPerformance = <T extends (...args: any[]) => any>(
    fn: T,
    label: string
  ): T => {
    return ((...args: Parameters<T>): ReturnType<T> => {
      const start = performance.now();
      const result = fn(...args);
      const end = performance.now();
      console.log(`Performance [${label}]: ${end - start}ms`);
      return result;
    }) as T;
  };

  return {
    prefetchRoute,
    preloadCriticalResource,
    measureFunctionPerformance,
  };
};
