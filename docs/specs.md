# Multi-photo upload — product specification

## User story

**As a** shopper customizing a product with multiple photos,  
**I want** a guided upload experience that lets me review, edit, and personalize each photo step-by-step,  
**so that** I can easily complete the customization without confusion or errors.

---

## Scope / overview

The new experience introduces:

- A **step-based Photo Editor** wizard  
- **Multi-image** upload handling  
- **Updated Item Editor** states  
- Improved **validation** and **upload** handling  
- Support for **personalization text** per image  
- **Cross-page** consistency (PDP and Cart)  
- Compatibility with existing **configuration labels**  

---

## Terminology

| Term | Meaning |
|------|---------|
| **IE (Item Editor / Image Experience)** | The on-page area where placeholders, thumbnails, upload state, and reordering live. |
| **Photo Editor** | Modal wizard for editing each image step (canvas, personalization, navigation). |
| **Snapshot** | In-editor preview of a selected image before save/confirm. |

---

## Functional requirements

### 1. Item Editor (IE)

The Item Editor supports **two primary states**: **Initial** (nothing saved yet) and **With saved images** (at least one image confirmed from the editor). Additional **empty-slot placeholders** apply while the user is mid-flow.

#### 1.1 Initial state

Displayed when **no images have been saved** yet.

**UI / behavior**

- Show a **title** indicating the **required number** of images.  
- Show a **single Upload CTA** placeholder (not per-slot rows yet).  
- Copy **comes from SysTranslations** and updates dynamically based on:  
  - **number of required images**  
  - **presence of personalization text** (optional vs mandatory messaging)  

**Interaction**

| Condition | Result |
|-----------|--------|
| No images selected yet | Opens **OS file selection**. |
| Image **snapshots** already exist (not yet saved) | Opens **Photo Editor on Step 1**. |

---

#### 1.2 With saved images

Shown when **at least one** image has been confirmed or saved from the editor.

**UI (per image)**

| Element | Notes |
|---------|--------|
| Title | Shows count of saved images (e.g. “2 of 3”). |
| Image number | Per-slot indicator. |
| Personalization text | Associated copy for that image. |
| Upload status | e.g. “Uploading…”. |
| Cancel upload | Available while uploading. |
| Validation | Errors, resolution, timeout, etc. |
| Remove (×) | Removes image from flow. |
| Edit | Entire row/card is clickable to edit. |
| Reorder | Supported for saved images. |

**Behavior**

- Clicking an image opens the Photo Editor on the **corresponding step**.
- If **earlier steps are missing** images → open the **earliest missing** step instead.

---

#### 1.3 Empty slot placeholders (in progress)

For **individual slots** not yet filled while the user is past the initial single-CTA state:

**UI (per empty slot)**

- Image number.  
- Upload instruction copy.  
- Upload CTA.  

**Click behavior**

| Condition | Result |
|-----------|--------|
| No images selected yet | Opens **OS file selection**. |
| Snapshots already exist (not all saved) | Opens Photo Editor on the **earliest unsaved** step. |

---

### 2. OS file selection

**File restrictions**

- Only **supported image formats** (same validation as Photo Upload V2).
- **Max files** = remaining empty slots (see below).

**Selection rules**

| Situation | File limit |
|-----------|------------|
| No images selected yet | Up to what the user selects (within slot cap). |
| Some images already selected | **Remaining** required slots only. |

**Validation** (unchanged vs Photo Upload V2)

- File type, size, resolution handling, etc.
- Resolution follows existing **Block / Warn / Skip** configuration.

---

### 3. Photo Editor (wizard)

Guides the user **per image** in order.

#### 3.1 When the editor opens

The editor opens when:

- User finishes **OS file selection**, or  
- User **clicks an image** in the IE, or  
- User clicks a **placeholder** while **snapshots already exist** (see §1.3; **§1.1** uses **Step 1** when opening from the initial placeholder with snapshots).

**Exception — `SimplifiedImageUpload` label**

- Editor does **not** open automatically after file pick.
- Images appear **directly in the IE**.
- Editor opens **only** when the user clicks an image.

#### 3.2 Layout

- Title  
- Close (**×**)  
- Stepper  
- Image canvas  
- Personalization text field  
- Navigation CTAs  

#### 3.3 Stepper

- **Steps** = number of images in the flow.
- Shows current / completed / upcoming.
- User can move between steps **unless** mandatory inputs are missing (image or required text).
- **Until edits are saved**, reopening the editor always lands on **Step 1**.

#### 3.4 Image canvas

- Shows snapshot of the image for the current step.
- **Features:** PNG overlay when applicable, **Replace** (single file pick), zoom, rotate, snapshot preview.
- **Order** of images matches **OS selection order**.
- Validation and low-resolution warnings follow product configuration.

#### 3.5 Text personalization

- Fields may be **optional or mandatory** (must be obvious in UI).
- Max character indication preserved.
- Validation rules applied.
- **Focus:** auto-focus on desktop; on mobile, focus when keyboard behavior allows.

#### 3.6 Editor CTAs

**Next**

- Advances to next step; hidden on last step.
- **Disabled** if: image missing, required text missing, or validation errors.

**Back**

- Goes to previous step; hidden on first step.

**Confirm My Design** (last step only)

- Saves all images, starts upload, closes editor, refreshes IE with saved state.
- **Disabled** if: image missing, required text missing, or validation errors.

**Save & Close**

- Only on the **latest step reached** (not on the final step; **hidden** for single-image case).
- Saves through **current** step, uploads, closes, updates IE.
- **Disabled** under same conditions as Confirm.

---

### 4. Closing the editor (without confirming)

User can close via **×** or **click outside** the modal.

**Result**

- Snapshots and text inputs are **preserved** in memory.
- Edits are **not** saved.
- IE stays as it was **before** the editor was opened.

---

### 5. Upload handling

**After save (Confirm or Save & Close)**

- IE shows thumbnails.
- Upload indicator visible; user can **cancel** upload.
- If cancel → remove image; IE updates. If **all** images removed → IE returns to **initial** state.

**During upload**

- Thumbnails reflect status; cancel available where specified.
- **Add to cart** disabled until uploads complete (see §6–7).

**Timing**

- Upload starts **only** after **Confirm** or **Save & Close**.
- Stages: snapshot preview generation → server upload → IE reflects status.
- Optimize timing with state management in mind.

---

### 6. Page exit during upload

**Add to cart**

- **Disabled** while uploads are in progress.
- Tooltip explains why.

**Leaving the page**

- Warn: leaving may lose images still uploading.

---

### 7. Cross-page behavior

The same experience applies on:

- **Cart** page  
- **Edit item** panel in cart  

Upload rules in §5 apply consistently (e.g. add to cart gated until uploads finish).

---

### 8. Acceptance criteria

- [ ] Multi-image flow uses a **step-based** wizard.
- [ ] Steps follow **file selection order**.
- [ ] **Mandatory text** blocks navigation until satisfied.
- [ ] Upload starts **only** after **Confirm** or **Save & Close**.
- [ ] IE shows **saved images** and **placeholders** correctly (including **initial** single-CTA state per §1.1).
- [ ] **Reorder** works for saved images.
- [ ] Low-resolution behavior matches existing **Block / Warn / Skip** config.
- [ ] **`SimplifiedImageUpload`** path behaves as specified (§3.1).
- [ ] Upload state **blocks checkout** until complete.
- [ ] Cart / edit-item **parity** with PDP flow.
- [ ] **SysTranslations** drive initial placeholder copy with correct **dynamic** rules (§1.1).

---

### 9. Edge cases

- User closes editor with **unsaved** edits.
- User uploads **fewer** images than required.
- User **cancels** upload mid-process.
- **Upload fails** (e.g. network).
- User moves between steps **without** saving.
- Resolution validation **warns** or **blocks** per config.
- User **removes all** saved images.
- Complex step edit: e.g. 3 of 4 images saved → remove image from step 2 → user clicks steps 3 and 4.
- **Upload in progress** while user attempts checkout.
