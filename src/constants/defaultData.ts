import { Category } from '../types';

export const defaultCategories: Category[] = [
  {
    id: 'aws',
    name: 'AWS',
    icon: 'Cloud',
    color: '#FF9900',
    gradient: '#FF9900',
    links: [
      {
        id: '1',
        title: 'AWS Console',
        url: 'https://console.aws.amazon.com',
        description: 'AWS Management Console for cloud services'
      },
      {
        id: '2',
        title: 'AWS Documentation',
        url: 'https://docs.aws.amazon.com',
        description: 'Complete AWS service documentation'
      }
    ],
    subdirectories: [
      {
        id: 'compute',
        name: 'Compute Services',
        isExpanded: false,
        links: [
          {
            id: '3',
            title: 'EC2 Dashboard',
            url: 'https://console.aws.amazon.com/ec2',
            description: 'Elastic Compute Cloud instances'
          },
          {
            id: '4',
            title: 'Lambda Functions',
            url: 'https://console.aws.amazon.com/lambda',
            description: 'Serverless compute service'
          }
        ]
      },
      {
        id: 'storage',
        name: 'Storage Services',
        isExpanded: false,
        links: [
          {
            id: '5',
            title: 'S3 Buckets',
            url: 'https://console.aws.amazon.com/s3',
            description: 'Simple Storage Service'
          }
        ]
      }
    ]
  },
  {
    id: 'docker',
    name: 'Docker',
    icon: 'Container',
    color: '#2496ED',
    gradient: '#2496ED',
    links: [
      {
        id: '6',
        title: 'Docker Hub',
        url: 'https://hub.docker.com',
        description: 'Container image registry'
      },
      {
        id: '7',
        title: 'Docker Documentation',
        url: 'https://docs.docker.com',
        description: 'Official Docker documentation'
      }
    ],
    subdirectories: []
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes',
    icon: 'Kubernetes',
    color: '#326CE5',
    gradient: '#326CE5',
    links: [
      {
        id: '8',
        title: 'Kubernetes Dashboard',
        url: 'https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/',
        description: 'Web-based Kubernetes user interface'
      }
    ],
    subdirectories: []
  },
  {
    id: 'monitoring',
    name: 'Monitoring',
    icon: 'Activity',
    color: '#E6522C',
    gradient: '#E6522C',
    links: [
      {
        id: '9',
        title: 'Grafana',
        url: 'https://grafana.com',
        description: 'Analytics and monitoring platform'
      },
      {
        id: '10',
        title: 'Prometheus',
        url: 'https://prometheus.io',
        description: 'Monitoring system and time series database'
      }
    ],
    subdirectories: []
  },
  {
    id: 'cicd',
    name: 'CI/CD',
    icon: 'GitBranch',
    color: '#28a745',
    gradient: '#28a745',
    links: [
      {
        id: '11',
        title: 'Jenkins',
        url: 'https://jenkins.io',
        description: 'Open source automation server'
      },
      {
        id: '12',
        title: 'GitHub Actions',
        url: 'https://github.com/features/actions',
        description: 'CI/CD platform integrated with GitHub'
      }
    ],
    subdirectories: []
  },
  {
    id: 'databases',
    name: 'Databases',
    icon: 'Database',
    color: '#336791',
    gradient: '#336791',
    links: [
      {
        id: '13',
        title: 'PostgreSQL',
        url: 'https://postgresql.org',
        description: 'Advanced open source relational database'
      },
      {
        id: '14',
        title: 'MongoDB',
        url: 'https://mongodb.com',
        description: 'Document-oriented NoSQL database'
      }
    ],
    subdirectories: []
  },
  {
    id: 'security',
    name: 'Security',
    icon: 'Shield',
    color: '#dc3545',
    gradient: '#dc3545',
    links: [
      {
        id: '15',
        title: 'HashiCorp Vault',
        url: 'https://vaultproject.io',
        description: 'Secrets management and data protection'
      },
      {
        id: '16',
        title: 'OWASP',
        url: 'https://owasp.org',
        description: 'Web application security resources'
      }
    ],
    subdirectories: []
  },
  {
    id: 'networking',
    name: 'Networking',
    icon: 'Network',
    color: '#6f42c1',
    gradient: '#6f42c1',
    links: [
      {
        id: '17',
        title: 'Nginx',
        url: 'https://nginx.org',
        description: 'High-performance web server and reverse proxy'
      },
      {
        id: '18',
        title: 'Cloudflare',
        url: 'https://cloudflare.com',
        description: 'CDN and web security services'
      }
    ],
    subdirectories: []
  },
  {
    id: 'infrastructure',
    name: 'Infrastructure',
    icon: 'Server',
    color: '#fd7e14',
    gradient: '#fd7e14',
    links: [
      {
        id: '19',
        title: 'Terraform',
        url: 'https://terraform.io',
        description: 'Infrastructure as Code tool'
      },
      {
        id: '20',
        title: 'Ansible',
        url: 'https://ansible.com',
        description: 'Configuration management and automation'
      }
    ],
    subdirectories: []
  }
];
