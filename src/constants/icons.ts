import {
  Server, Container, Hexagon as Kubernetes, Activity, BarChart3, GitBranch,
  Wrench, Terminal, Cloud, Database, Shield, Monitor, Cpu, HardDrive,
  Network, Settings, Code, Globe, Lock, Key, Eye, AlertTriangle,
  CheckCircle, PlayCircle, PauseCircle, RefreshCw, Upload, Download,
  Package, Layers, Box, Workflow, Timer, Bell, Mail, MessageSquare,
  Users, User, FileText, Clipboard, Calendar, Clock, Gauge, TrendingUp,
  BarChart, PieChart, LineChart, Target, Flag, Star, Heart, Bookmark,
  Tag, Filter, Sliders, ToggleLeft, ToggleRight, Power, Wifi,
  Smartphone, Tablet, Laptop, Printer, Camera, Mic, Speaker,
  Headphones, Volume2, VolumeX, Play, Pause, SkipBack, SkipForward,
  Repeat, Shuffle, Radio, Tv, Film, Image, Video, Music, FileImage,
  FileVideo, FileAudio, Archive, Briefcase, Building, Factory, Truck,
  Plane, Ship, Car, Bike, Bus, Train, Rocket, Satellite, Compass,
  Map, MapPin, Navigation, Route, Anchor, Umbrella, Sun, Moon,
  CloudRain, CloudSnow, Thermometer, Wind, Flame, Droplets, Snowflake,
  Leaf, Flower, Bug, Fish, Bird
} from 'lucide-react';

// Optimized icon mapping for dynamic rendering
// Time Complexity: O(1) for icon lookup
// Space Complexity: O(n) where n is number of mapped icons
export const iconMap: Record<string, any> = {
  // DevOps & Infrastructure
  Server,
  Container,
  Kubernetes: Kubernetes, // Hexagon imported as Kubernetes
  Cloud,
  Database,
  Monitor,
  Cpu,
  HardDrive,
  Network,
  
  // Development
  Code,
  GitBranch,
  Terminal,
  Package,
  Layers,
  Box,
  Workflow,
  
  // Security
  Shield,
  Lock,
  Key,
  Eye,
  
  // Monitoring & Analytics
  Activity,
  BarChart3,
  Gauge,
  TrendingUp,
  BarChart,
  PieChart,
  LineChart,
  Target,
  
  // Status & Alerts
  AlertTriangle,
  CheckCircle,
  PlayCircle,
  PauseCircle,
  RefreshCw,
  Bell,
  
  // File Operations
  Upload,
  Download,
  FileText,
  FileImage,
  FileVideo,
  FileAudio,
  Archive,
  
  // Communication
  Mail,
  MessageSquare,
  Users,
  User,
  
  // Organization
  Clipboard,
  Calendar,
  Clock,
  Timer,
  Flag,
  Star,
  Heart,
  Bookmark,
  Tag,
  Filter,
  
  // Controls
  Settings,
  Wrench,
  Sliders,
  ToggleLeft,
  ToggleRight,
  Power,
  
  // Connectivity
  Globe,
  Wifi,
  
  // Devices
  Smartphone,
  Tablet,
  Laptop,
  Printer,
  Camera,
  
  // Media
  Mic,
  Speaker,
  Headphones,
  Volume2,
  VolumeX,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  Radio,
  Tv,
  Film,
  Image,
  Video,
  Music,
  
  // Business
  Briefcase,
  Building,
  Factory,
  
  // Transportation
  Truck,
  Plane,
  Ship,
  Car,
  Bike,
  Bus,
  Train,
  Rocket,
  Satellite,
  
  // Navigation
  Compass,
  Map,
  MapPin,
  Navigation,
  Route,
  Anchor,
  
  // Weather & Nature
  Umbrella,
  Sun,
  Moon,
  CloudRain,
  CloudSnow,
  Thermometer,
  Wind,
  Flame,
  Droplets,
  Snowflake,
  Leaf,
  Flower,
  Bug,
  Fish,
  Bird
};

export const iconOptions = Object.keys(iconMap);
