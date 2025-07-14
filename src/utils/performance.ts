// Performance monitoring utilities for production optimization
// Time Complexity: O(1) for all operations
// Space Complexity: O(1) for metrics storage

/**
 * Lightweight performance monitor for tracking app performance
 * Only active in development mode to avoid production overhead
 */
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number> = new Map();
  private isDev = process.env.NODE_ENV === 'development';

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  /**
   * Start timing an operation
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  startTiming(label: string): void {
    if (!this.isDev) return;
    this.metrics.set(label, performance.now());
  }

  /**
   * End timing and log result
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  endTiming(label: string): number {
    if (!this.isDev) return 0;
    
    const startTime = this.metrics.get(label);
    if (!startTime) return 0;
    
    const duration = performance.now() - startTime;
    console.log(`⚡ ${label}: ${duration.toFixed(2)}ms`);
    this.metrics.delete(label);
    return duration;
  }

  /**
   * Measure component render time
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  measureRender(componentName: string, renderFn: () => void): void {
    if (!this.isDev) {
      renderFn();
      return;
    }
    
    this.startTiming(`${componentName} render`);
    renderFn();
    this.endTiming(`${componentName} render`);
  }

  /**
   * Log memory usage (development only)
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  logMemoryUsage(label: string): void {
    if (!this.isDev || !('memory' in performance)) return;
    
    const memory = (performance as any).memory;
    console.log(`🧠 ${label} Memory:`, {
      used: `${(memory.usedJSHeapSize / 1024 / 1024).toFixed(2)}MB`,
      total: `${(memory.totalJSHeapSize / 1024 / 1024).toFixed(2)}MB`,
      limit: `${(memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2)}MB`
    });
  }
}

/**
 * Debounce function for performance optimization
 * Time Complexity: O(1) per call
 * Space Complexity: O(1) for timer storage
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Throttle function for performance optimization
 * Time Complexity: O(1) per call
 * Space Complexity: O(1) for state storage
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Lazy loading utility for components
 * Time Complexity: O(1) for setup
 * Space Complexity: O(1) for promise storage
 */
export function createLazyComponent<T extends React.ComponentType<any>>(
  importFn: () => Promise<{ default: T }>
): React.LazyExoticComponent<T> {
  return React.lazy(importFn);
}

/**
 * Bundle size analyzer (development only)
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
export function analyzeBundleSize(): void {
  if (process.env.NODE_ENV !== 'development') return;
  
  // Estimate bundle size based on loaded modules
  const scripts = document.querySelectorAll('script[src]');
  let totalSize = 0;
  
  scripts.forEach(script => {
    const src = script.getAttribute('src');
    if (src && src.includes('assets')) {
      // Rough estimation - in real app, use webpack-bundle-analyzer
      totalSize += 100; // KB estimate per chunk
    }
  });
  
  console.log(`📦 Estimated bundle size: ~${totalSize}KB`);
}

// Export singleton instance
export const perfMonitor = PerformanceMonitor.getInstance();

// React import for lazy loading
import React from 'react';
