# Decap CMS - Portfolio Management Guide

## Overview
Decap CMS provides a secure, admin-only interface to manage all portfolio data. The public React app displays this data in read-only mode, while authenticated users can edit data through the CMS.

## Access Admin Panel
**URL:** https://vertex-capital-portifolio.netlify.app/admin/

## Authentication
1. Click "Login with GitHub" on the admin panel
2. Authorize the Vertex Capital Portfolio OAuth app
3. You'll be redirected to the CMS dashboard

**Requirements:** Must be a collaborator on the GitHub repository

## Collections & Editing

### 1. Portfolio Data
**Location:** Portfolio Data collection

Edit the following:

#### Allocations
- **Asset Class:** Select from Fixed Income, Domestic Equities, Regional (EAC/SADC) Equities, or Cash & Cash Equivalents
- **Target %:** Target allocation percentage (0-100)
- **Current %:** Current actual allocation (0-100)
- **Deviation %:** Auto-calculated difference
- **Rebalancing Required:** Toggle yes/no
- **Notes:** Free-form notes about the allocation

**Example:** Update "Fixed Income" current from 0% to 50% to match target

#### Securities
Add or edit individual security holdings:
- **Name:** Security name (e.g., "Tanzania Government Bond 2026")
- **Ticker:** Trading symbol (e.g., "TGB-26")
- **Asset Class:** Category
- **Current/Target Weight %:** Position weights
- **Sector:** Banking, Telecommunications, Consumer Goods, Government, Technology, Energy, or Other
- **Geographic Exposure:** Tanzania, Kenya, Uganda, South Africa, or Regional
- **Market Value:** Position value in TZS
- **Quantity & Prices:** Share/unit count and prices
- **IPS Compliant:** Checkbox for compliance status
- **Notes:** Position details

### 2. Risk Metrics
**Location:** Risk Metrics collection

Edit portfolio-wide risk indicators:
- **Metric Name:** (e.g., "Single Security Exposure")
- **IPS Limit:** The rule (e.g., "≤10%")
- **Current Value:** Present metric value
- **Status:** Select Compliant, Warning, or Breach
- **Action Required:** Description of action needed

### 3. Portfolio Settings
**Location:** Portfolio Settings collection

Update general portfolio information:
- **Portfolio Name:** Official portfolio name
- **Portfolio Manager:** Manager name/title
- **Last Updated:** Date/time of last update
- **Total Portfolio Value:** Total assets under management in TZS
- **Benchmark Index:** Benchmark (e.g., "Tanzania Stock Exchange Index")
- **YTD Performance %:** Year-to-date return percentage

## Data Flow

```
Decap CMS (Edit) → GitHub JSON Files → Netlify Build → React App (Display)
```

1. **Edit in CMS:** Update data in the admin panel
2. **Saved to GitHub:** Changes auto-commit to `src/data/` JSON files
3. **Netlify Rebuilds:** Site automatically rebuilds when data changes
4. **App Updates:** React app refreshes with latest data (1-2 minutes)

## Key Points

✅ **Read-Only Public App:** Users see current data but cannot modify it  
✅ **Admin-Only Editing:** Only GitHub-authenticated admins can edit  
✅ **Version Control:** All changes tracked in Git  
✅ **Auto-Deploy:** Changes trigger automatic rebuild and deployment  
✅ **Real-Time Display:** Updated data appears on all portfolio pages  

## Example Workflows

### Update Current Allocations
1. Go to Portfolio Data → Portfolio Allocations
2. Click on an allocation to edit
3. Update "Current %" to match real portfolio
4. Save changes
5. Allocations display updates within 1-2 minutes

### Add New Security
1. Go to Portfolio Data → Securities
2. Click "Add" to create new entry
3. Fill in all security details (name, ticker, weights, sector, etc.)
4. Save
5. New security appears in Security Exposure page

### Flag Compliance Issue
1. Go to Risk Metrics
2. Update relevant metric's "Current Value"
3. Change "Status" to "Warning" or "Breach" if needed
4. Add "Action Required" note
5. Risk Metrics page displays flag automatically

## Support
For issues accessing the admin panel or editing data:
- Verify GitHub login credentials
- Check that you're a repository collaborator
- Ensure browser allows OAuth redirects
- Clear browser cache if seeing stale data

---

**Last Updated:** January 14, 2026  
**Portfolio:** Vertex Capital Investment Portfolio  
**Admin URL:** https://vertex-capital-portifolio.netlify.app/admin/
