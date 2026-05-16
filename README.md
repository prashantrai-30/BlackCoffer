# Data Visualization Dashboard - Requirement Documentation

## 1. Project Overview
The dashboard delivers a consolidated view of global signals across industries, regions, and topics using the provided JSON dataset. It enables decision makers to explore intensity, likelihood, and relevance of insights over time and geography.

Purpose:
- Provide a single source of truth for exploratory analysis of the dataset.
- Surface trends by topic, sector, PESTLE, and geography.
- Support strategic prioritization with quantitative and narrative context.

Goals:
- Make it easy to detect high-intensity, high-relevance signals.
- Allow users to filter and drill down quickly to a subset of interest.
- Offer actionable summaries of what is changing by year and region.

Why visualization matters:
- The dataset combines quantitative scores with categorical attributes; visual encoding helps spot patterns and anomalies.
- Trends across time and geography are not obvious in raw JSON; charts make those relationships visible.

## 2. Tech Stack Justification
- Next.js: strong for SEO-friendly dashboards, routing, and server-side data fetching with a clean component model.
- Node.js + Express: lightweight, fast API layer for data retrieval and aggregation.
- MongoDB: flexible schema fits the semi-structured JSON; supports aggregations for analytics.
- D3.js: high control for custom, interactive charts and advanced visuals.
- Tailwind CSS: rapid, consistent styling for a dense, information-rich UI.

## 3. System Architecture
Frontend:
- Next.js app with a dashboard layout, state management for filters, and D3-driven visualization components.

Backend:
- Express API for data access, filtering, and aggregation.
- Dedicated endpoints for dashboard metrics and chart-ready aggregates.

Database:
- Single MongoDB collection containing the JSON records.
- Indexes aligned to filter fields and common group-bys.

Data flow:
MongoDB -> API query/aggregation -> API response -> Frontend state -> D3 charts

## 4. Dataset Understanding
Observed fields from jsondata.json:
- end_year (number or empty string)
- start_year (number or empty string)
- intensity (number)
- likelihood (number)
- relevance (number)
- impact (number or empty string)
- sector (string, often empty)
- topic (string, often empty)
- insight (string)
- title (string)
- url (string)
- region (string, often empty)
- country (string, often empty)
- pestle (string, often empty)
- source (string)
- added (date string)
- published (date string or empty)

Data types and quality notes:
- Numeric scores: intensity, likelihood, relevance; impact is mixed type.
- Date fields are stored as strings; year must be parsed from end_year/start_year/published/added.
- Missing values appear as empty strings for many categorical fields.
- There is no explicit city field in the dataset; city may be missing entirely.
- There is no explicit SWOT field in the dataset; SWOT may need derivation or remain empty.

Fields useful for analytics:
- Quantitative scoring: intensity, likelihood, relevance.
- Time dimensions: end_year, start_year, published, added.
- Category dimensions: sector, topic, region, country, pestle, source.

## 5. Core Dashboard Features
- Interactive charts with hover tooltips and cross-filtering.
- Real-time filtering by required controls with clear active filter indicators.
- Search by text across title, insight, topic, source.
- Dynamic updates when filters change (no page reloads).
- Responsive layout for desktop and mobile.
- Drill-down from summary charts to record lists.
- Data grouping by region, sector, topic, and year.
- Sorting options for top-N rankings and tables.

## 6. Required Visualizations
Each visualization includes: purpose, chart type, axes, interactions, and insights.

### Intensity
- Purpose: highlight strength of signals.
- Chart: histogram or box plot by sector or region.
- Axes: x = intensity, y = count or distribution.
- Interaction: brush to filter intensity range.
- Insight: which sectors/regions show extreme intensity.

### Likelihood
- Purpose: show probability distribution of insights.
- Chart: bar chart by likelihood bucket (1-5) and stacked by sector.
- Axes: x = likelihood bucket, y = count.
- Interaction: click bucket to filter records.
- Insight: probability concentration across topics.

### Relevance
- Purpose: show priority level of insights.
- Chart: lollipop or ranked bar chart by topic/sector average relevance.
- Axes: y = topic/sector, x = avg relevance.
- Interaction: sort and top-N toggle.
- Insight: identify themes with highest relevance.

### Year
- Purpose: trend analysis over time.
- Chart: line or area chart of record count and avg intensity by year.
- Axes: x = year, y = count or avg intensity.
- Interaction: brush to set year range.
- Insight: growth or decline in activity.

### Country
- Purpose: geographic distribution.
- Chart: choropleth map or ranked bar chart.
- Axes: map by country, or x = count/avg intensity, y = country.
- Interaction: click country to filter.
- Insight: hotspots by geography.

### Topics
- Purpose: category coverage.
- Chart: treemap or packed bubble chart.
- Axes: size = count or avg intensity; color = relevance.
- Interaction: click topic to filter.
- Insight: dominant topics and their quality.

### Region
- Purpose: macro geographic patterns.
- Chart: stacked bar or heatmap by region and pestle.
- Axes: x = region, y = count, color = pestle.
- Interaction: toggle pestle categories.
- Insight: region-by-PESTLE breakdown.

### City
- Purpose: local granularity (if present or derived).
- Chart: top-N ranked bar chart or map pins.
- Axes: x = count/avg intensity, y = city.
- Interaction: search and click to filter.
- Insight: localized clusters (if data supports it).

### Sector
- Purpose: industry-level distribution.
- Chart: horizontal bar chart or dot plot.
- Axes: y = sector, x = count or avg intensity.
- Interaction: multi-select sectors.
- Insight: which sectors dominate the dataset.

### Source
- Purpose: data provenance and reliability.
- Chart: bar chart of counts by source with avg relevance overlay.
- Axes: y = source, x = count; marker = avg relevance.
- Interaction: filter by source.
- Insight: source coverage and quality.

### PEST
- Purpose: macro lens by political/economic/social/tech/etc.
- Chart: stacked bar by pestle vs region or sector.
- Axes: x = pestle, y = count, color = region or sector.
- Interaction: click pestle category.
- Insight: which macro factors are most active.

### SWOT
- Purpose: strategic framing (if derived).
- Chart: quadrant summary or bar chart if SWOT is generated.
- Axes: category = SWOT, value = count or avg relevance.
- Interaction: click to filter.
- Insight: balance of strengths/weaknesses/opportunities/threats.

Additional creative D3 visualizations:
- Sankey: flow from region -> sector -> topic.
- Radar: compare average intensity/likelihood/relevance by sector.
- Calendar heatmap: volume by date added or published.

## 7. Dashboard Layout Planning
- Sidebar: global filters, saved views, quick navigation.
- Navbar: search, reset filters, export, user menu.
- KPI cards: total records, avg intensity, avg relevance, top topic, top region.
- Filter panel: grouped filters with multi-select and search.
- Main analytics: 2-3 wide grid of charts with responsive stacking.
- Detail panel: record list with sorting and pagination.
- Mobile: collapsible sidebar, stacked charts, simplified KPIs.

## 8. Filters and Controls
Required filters and logic:
- End Year: range slider or dropdown; filters by end_year.
- Topics: multi-select by topic.
- Sector: multi-select by sector.
- Region: multi-select by region.
- PEST: uses pestle field.
- Source: multi-select by source.
- SWOT: derived or optional until data exists.
- Country: multi-select by country.
- City: derived or optional if missing.

Control behavior:
- Searchable dropdowns for large categories.
- Multi-select with clear chips and counts.
- Reset filters to default state.
- Cross-filtering: selecting a chart element applies the related filter.
- Empty-state messaging when no records match.

## 9. API Planning
Conceptual endpoints (behavior only):
- Fetch all data: supports pagination and sorting.
- Filtered data: accepts filter parameters and returns matching records.
- Aggregations: returns grouped metrics for charts (counts, averages).
- Analytics endpoints: provides top-N lists and KPI aggregates.

Response behavior:
- JSON responses with metadata: total count, page info, filters applied.
- Consistent schema for chart-ready data.

## 10. MongoDB Database Design
- Single collection for all records with fields mirroring the JSON.
- Indexes: end_year, start_year, topic, sector, region, country, pestle, source.
- Query optimization: prefer aggregation pipelines for grouped metrics.
- Data hygiene: normalize empty strings to nulls for reliable filtering.

## 11. D3.js Visualization Strategy
- D3 chosen for fine-grained control over complex, interactive visuals.
- Animation: staged chart entrance and smooth transitions on filter change.
- Interactivity: hover tooltips, click-to-filter, brush selection.
- Responsive SVG: viewBox scaling and container-based sizing.
- Tooltip strategy: show key metrics, include title/insight snippet.
- Zoom/pan: for maps and dense scatter plots.
- Color encoding: consistent palettes by category with accessibility-safe contrast.

## 12. UI/UX Guidelines
- Modern analytics layout with clear hierarchy and readable typography.
- Optional dark/light theme toggle.
- Accessible color usage with contrast-compliant palettes.
- Consistent spacing, grid alignment, and chart sizing.
- Loading states for charts and data panels.
- Empty states that explain why no data is shown and how to reset.

## 13. Performance Optimization
- Pagination or virtualized lists for records.
- Server-side aggregation for chart data.
- Memoized filtering and cached API responses.
- Debounced filter changes to reduce API load.
- Efficient D3 updates using data joins instead of full re-render.

## 14. Security Considerations
- Validate and sanitize API inputs.
- Protect against MongoDB query injection.
- Store secrets in environment variables.
- Rate limiting on public endpoints.
- Centralized error handling with safe messages.

## 15. Development Roadmap
Phase 1: Database setup and data import.
Phase 2: Backend API design and aggregation endpoints.
Phase 3: Dashboard UI and layout scaffolding.
Phase 4: D3 visualizations and interactions.
Phase 5: Performance tuning and UX polish.
Phase 6: Deployment and monitoring.

## 16. Folder Structure Recommendation
High-level structure:
- frontend/ (Next.js app)
- backend/ (Node.js + Express API)
- database/ (data import scripts and schema notes)
- docs/ (requirements and documentation)

## 17. Future Enhancements
- AI-generated insights and anomaly detection.
- Predictive analytics for trends by sector or topic.
- Exportable reports in PDF/CSV.
- User authentication and role-based access.
- Saved dashboards and shared views.
- Real-time updates via streaming or scheduled refresh.

## 18. Deployment Strategy
- Frontend: host on a platform optimized for Next.js.
- Backend: containerized Node.js API with health checks.
- MongoDB: managed cloud instance with automated backups.
- Environment setup: separate dev/stage/prod configs.

## 19. Risks and Challenges
- D3 complexity for custom interactions and responsiveness.
- Large dataset rendering and slow cross-filtering.
- Aggregation performance under multiple filters.
- Syncing filter state across charts and lists.

## 20. Final Project Outcome
A polished analytics dashboard that turns the JSON dataset into clear, interactive intelligence. Users should feel confident navigating trends, identifying hot spots, and extracting insights quickly with minimal friction.