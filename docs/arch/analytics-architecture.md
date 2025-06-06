# Analytics Architecture

## System Overview

VastSilicon's analytics implementation prioritizes performance through minimal bundle impact while providing comprehensive tracking of user behavior and website performance metrics.

```mermaid
graph TB
    subgraph "Client Browser"
        A[Next.js App] --> B[Analytics Component]
        A --> C[Performance Monitor]
        A --> D[Business Components]
        
        B --> E[@vercel/analytics React]
        C --> F[Web Vitals Library]
        D --> G[Analytics Events API]
    end
    
    subgraph "Event Processing"
        E --> H[Vercel Analytics SDK]
        F --> H
        G --> H
        
        H --> I[Event Validation]
        I --> J[Data Enrichment]
        J --> K[Transmission Queue]
    end
    
    subgraph "Vercel Infrastructure"
        K --> L[Analytics Ingestion]
        L --> M[Data Processing]
        M --> N[Real-time Dashboard]
        M --> O[Historical Storage]
    end
    
    subgraph "Access Points"
        N --> P[Vercel Dashboard]
        O --> Q[Analytics API]
        Q --> R[Data Export]
    end
    
    style A fill:#e1f5fe
    style H fill:#f3e5f5
    style L fill:#e8f5e8
    style P fill:#fff3e0
```

## Component Architecture

### Core Components

```mermaid
flowchart TD
    subgraph Layout["📄 Layout Layer"]
        A[layout.tsx] --> B[Analytics Component]
        A --> C[PerformanceOptimizer]
    end
    
    subgraph Business["🏢 Business Layer"]
        D[HomePage] --> E[trackAppStoreClick]
        F[ProductPage] --> E
        G[BlogPage] --> E
    end
    
    subgraph Analytics["📊 Analytics Layer"]
        B --> H[Automatic Pageviews]
        C --> I[Core Web Vitals]
        C --> J[Performance Events]
        E --> K[Custom Business Events]
        
        H --> L[analytics.ts]
        I --> L
        J --> L
        K --> L
    end
    
    subgraph SDK["🔧 SDK Layer"]
        L --> M["@vercel/analytics track()"]
        M --> N[Vercel Infrastructure]
    end
    
    classDef layout fill:#e3f2fd,stroke:#1976d2
    classDef analytics fill:#f1f8e9,stroke:#388e3c
    classDef sdk fill:#fce4ec,stroke:#c2185b
    classDef infra fill:#fff8e1,stroke:#f57c00
    
    class A,B,C layout
    class L analytics
    class M sdk
    class N infra
```

## Data Flow Architecture

### Event Lifecycle

```mermaid
sequenceDiagram
    participant U as User
    participant C as Component
    participant A as analytics.ts
    participant V as Vercel SDK
    participant S as Vercel Server
    participant D as Dashboard
    
    U->>C: Interacts with page
    C->>A: trackEvent(name, properties)
    A->>V: track(name, properties)
    
    Note over V: Client-side validation
    V->>V: Enrich with metadata
    V->>V: Queue for transmission
    
    V-->>S: Batch send events
    S->>S: Process & validate
    S->>S: Store in analytics DB
    
    Note over D: Near real-time updates
    S-->>D: Update dashboard
    
    opt Performance Events
        C->>A: Web Vitals callback
        A->>V: Core Web Vital event
    end
    
    opt Error Handling
        V-->>A: Transmission failure
        A->>A: Silent fail (no retry)
    end
```

## Event Schema Architecture

### Event Classification

```mermaid
flowchart TD
    A["🎯 All Events"] --> B["🤖 Automatic Events"]
    A --> C["✋ Custom Events"]
    
    B --> D[pageview]
    B --> E["navigation events"]
    
    C --> F["💼 Business Events"]
    C --> G["⚡ Performance Events"]
    
    F --> H[app_store_click]
    F --> I[content_engagement]
    
    G --> J["Core Web Vital"]
    G --> K["Long Task"]
    G --> L["Slow Resource"]
    
    subgraph Props["📋 Event Properties"]
        direction TB
        H --> M["product: string"]
        H --> N["platform: ios|android"]
        
        J --> O["metric: LCP|CLS|INP|FCP|TTFB"]
        J --> P["value: number"]
        J --> Q["rating: good|needs-improvement|poor"]
    end
    
    classDef auto fill:#e8f5e8,stroke:#4caf50
    classDef custom fill:#e1f5fe,stroke:#2196f3
    classDef business fill:#fff3e0,stroke:#ff9800
    classDef performance fill:#fce4ec,stroke:#e91e63
    
    class B auto
    class C custom
    class F business
    class G performance
```

## Technical Integration

### Bundle Impact Analysis

```mermaid
graph TB
    subgraph "Build Output"
        A[vendor-bundle.js: 664KB] --> B[React/Next: ~580KB]
        A --> C[Analytics: ~1.5KB]
        A --> D[Web Vitals: ~15KB]
        A --> E[Other: ~67.5KB]
    end
    
    subgraph "Runtime Loading"
        F[Initial Load] --> G[Analytics Component]
        F --> H[Performance Monitor]
        
        G --> I[Vercel SDK: 1.5KB]
        H --> J[Web Vitals: Dynamic Import]
        
        J --> K[Conditional Loading]
        K --> L[Performance Observer Available?]
        L -->|Yes| M[Load Web Vitals]
        L -->|No| N[Skip Performance Tracking]
    end
    
    subgraph "Performance Impact"
        O[First Load JS: 202KB] --> P[Analytics: ~0.7%]
        Q[Time to Interactive] --> R[No measurable impact]
        S[Core Web Vitals] --> T[Monitored, not affected]
    end
    
    style A fill:#ffebee
    style I fill:#e8f5e8
    style O fill:#e3f2fd
```

## Implementation Patterns

### Event Tracking Pattern

```mermaid
flowchart TD
    subgraph Standard["Standard Pattern"]
        A[User Action] --> B[Event Handler]
        B --> C[trackEvent]
        C --> D[Vercel SDK]
    end
    
    subgraph Performance["Performance Pattern"]
        E[Performance API] --> F[Observer Callback]
        F --> G[Dynamic Import Analytics]
        G --> H[Track Performance Event]
    end
    
    subgraph ErrorHandling["Error Handling"]
        I[Track Function] --> J{Environment Check}
        J -->|Production| K[Send Event]
        J -->|Development| L[Console Log]
        J -->|Server| M[Skip Silently]
        
        K --> N{Transmission Success}
        N -->|Fail| O[Silent Fail]
        N -->|Success| P[Continue]
    end
    
    classDef standard fill:#e8f5e8,stroke:#4caf50
    classDef performance fill:#fff3e0,stroke:#ff9800
    classDef error fill:#fce4ec,stroke:#e91e63
    
    class A,B,C,D standard
    class E,F,G,H performance
    class I,J,K,L,M,N,O,P error
```

## Configuration Management

### Environment-Based Behavior


```mermaid
graph TD
    A[Analytics Function Call] --> B{Environment?}
    
    B -->|production| C[Send to Vercel]
    B -->|development| D[Console Log Only]
    B -->|test| E[Mock/Skip]
    
    C --> F{User Preferences}
    F -->|Do Not Track| G[Skip Event]
    F -->|Allow| H[Process Event]
    
    H --> I{Event Validation}
    I -->|Valid| J[Queue for Transmission]
    I -->|Invalid| K[Drop Event]
    
    subgraph "Free Tier Management"
        J --> L{Monthly Limit Check}
        L -->|Under Limit| M[Send Event]
        L -->|Over Limit| N[Priority Filter]
        N --> O[Business Events Only]
    end
    
    style C fill:#e8f5e8
    style D fill:#fff3e0
    style H fill:#e3f2fd
    style M fill:#f1f8e9
```

## Monitoring and Maintenance

### Health Monitoring

```mermaid
graph TB
    subgraph "Operational Metrics"
        A[Bundle Size Monitoring] --> B[<210KB Total]
        C[Event Volume] --> D[<2500/month Free Tier]
        E[Performance Impact] --> F[<5ms Additional Load Time]
    end
    
    subgraph "Data Quality"
        G[Event Validation] --> H[Schema Compliance]
        I[Missing Events] --> J[Business Logic Issues]
        K[Performance Tracking] --> L[Web Vitals Accuracy]
    end
    
    subgraph "Business Value"
        M[Conversion Tracking] --> N[App Store CTR]
        O[Content Engagement] --> P[Page Performance]
        Q[User Journey] --> R[Drop-off Points]
    end
    
    subgraph "Alerts"
        B --> S[Bundle Size Alert]
        D --> T[Usage Limit Alert]
        J --> U[Tracking Failure Alert]
    end
    
    style A fill:#e8f5e8
    style G fill:#fff3e0
    style M fill:#e3f2fd
    style S fill:#ffebee
```

## Security and Privacy

### Data Protection Architecture

```mermaid
graph LR
    subgraph "Client Side"
        A[User Interaction] --> B[Event Creation]
        B --> C{PII Check}
        C -->|Contains PII| D[Block Event]
        C -->|Clean| E[Allow Event]
    end
    
    subgraph "Transmission"
        E --> F[Vercel SDK]
        F --> G[HTTPS Encryption]
        G --> H[Vercel Infrastructure]
    end
    
    subgraph "Server Side"
        H --> I[Data Validation]
        I --> J[Anonymization]
        J --> K[Storage]
    end
    
    subgraph "Access Control"
        K --> L[Dashboard Access]
        L --> M[Team Permissions]
        K --> N[API Access]
        N --> O[Export Controls]
    end
    
    style C fill:#ffebee
    style G fill:#e8f5e8
    style J fill:#e3f2fd
    style M fill:#fff3e0
```

## Usage Guidelines

### Development Workflow

```mermaid
graph TD
    A[Feature Development] --> B[Identify Tracking Needs]
    B --> C[Design Event Schema]
    C --> D[Implement Tracking]
    D --> E[Test in Development]
    E --> F[Verify in Staging]
    F --> G[Deploy to Production]
    G --> H[Monitor in Dashboard]
    
    subgraph "Event Design"
        C --> I[Business Value?]
        I -->|Yes| J[Add Event]
        I -->|No| K[Skip Tracking]
        
        J --> L[Minimal Properties]
        L --> M[No PII]
        M --> N[Clear Naming]
    end
    
    subgraph "Testing"
        E --> O[Console Log Verification]
        F --> P[Staging Dashboard Check]
        H --> Q[Production Validation]
    end
    
    style B fill:#e8f5e8
    style C fill:#fff3e0
    style H fill:#e3f2fd
```

## Future Considerations

### Scalability Architecture

```mermaid
graph TB
    subgraph "Current State"
        A[Vercel Analytics] --> B[2.5K events/month]
        A --> C[Basic Dashboard]
        A --> D[Limited Exports]
    end
    
    subgraph "Growth Path"
        E[Increased Usage] --> F[Paid Plan Upgrade]
        E --> G[Advanced Features Need]
        E --> H[Multi-Platform Tracking]
    end
    
    subgraph "Migration Options"
        F --> I[Vercel Pro Analytics]
        G --> J[PostHog/Mixpanel]
        H --> K[Segment + Multiple Providers]
    end
    
    subgraph "Abstraction Benefits"
        L[analytics.ts Interface] --> M[Easy Provider Swap]
        L --> N[Event Schema Preservation]
        L --> O[Minimal Code Changes]
    end
    
    style A fill:#e8f5e8
    style L fill:#e3f2fd
    style I fill:#fff3e0
```

This architecture ensures performance-first analytics implementation while maintaining flexibility for future growth and changes.