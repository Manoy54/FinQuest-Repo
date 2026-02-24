"""
CROSSWORD LAYOUT SOLVER
========================
Words:

DOWN:
 1. TRANSFERS      (9)   - Payments made by government to individuals
 2. DEBTOR         (6)   - A party that owes money
 4. VELOCITY       (8)   - Rate at which money exchanges hands
 5. DUPONT         (6)   - Identity that breaks down ROE (NOTE: spelled DUPONT not DUPOINT)
 6. WORKINGCAPITAL (14)  - Current assets minus current liabilities
 7. QUICK          (5)   - Ratio that excludes inventory
 9. MONOPOLISTIC   (12)  - Competition with similar but not identical products
11. COMPLEMENTS    (11)  - Two goods where increase in price of one decreases demand for other
12. INFERIOR       (8)   - Good for which demand decreases when income rises

ACROSS:
 3. RESERVE        (7)   - Percentage of deposits a bank must keep
 8. SUBSTITUTION   (12)  - Effect where consumers react to price rise
10. FACTORING      (9)   - Business sells accounts receivable to third party
13. COLLECTIBILITY (14)  - Likelihood that receivable will be converted to cash
14. FIDUCIARY      (9)   - Legal/ethical relationship of trust
15. PERPETUITY     (10)  - Annuity with no end date

Strategy: 
- Find natural intersections between words
- Verify ALL intersections have matching letters

Let me map out intersections first:
RESERVE(3A):    R-E-S-E-R-V-E
SUBSTITUTION(8A): S-U-B-S-T-I-T-U-T-I-O-N
FACTORING(10A): F-A-C-T-O-R-I-N-G
COLLECTIBILITY(13A): C-O-L-L-E-C-T-I-B-I-L-I-T-Y
FIDUCIARY(14A): F-I-D-U-C-I-A-R-Y
PERPETUITY(15A): P-E-R-P-E-T-U-I-T-Y

TRANSFERS(1D):  T-R-A-N-S-F-E-R-S
DEBTOR(2D):     D-E-B-T-O-R
VELOCITY(4D):   V-E-L-O-C-I-T-Y
DUPONT(5D):     D-U-P-O-N-T
WORKINGCAPITAL(6D): W-O-R-K-I-N-G-C-A-P-I-T-A-L
QUICK(7D):      Q-U-I-C-K
MONOPOLISTIC(9D): M-O-N-O-P-O-L-I-S-T-I-C
COMPLEMENTS(11D): C-O-M-P-L-E-M-E-N-T-S
INFERIOR(12D):  I-N-F-E-R-I-O-R
"""

# We'll try a specific layout and verify all intersections.
# Layout (row, col) - 0-indexed, across words start at (row, col), down words start at (row, col)

# Let me find valid intersections:
# TRANSFERS[0]=T, [1]=R, [2]=A, [3]=N, [4]=S, [5]=F, [6]=E, [7]=R, [8]=S
# RESERVE[0]=R, [1]=E, [2]=S, [3]=E, [4]=R, [5]=V, [6]=E
#   => TRANSFERS[1]=R intersects RESERVE[0]=R  (T's col 1 = R's col 0 -> T col = R col - 1)
#   Wait no, TRANSFERS is DOWN (vertical), RESERVE is ACROSS (horizontal)
#   If TRANSFERS is at (row_t, col_t) going down, and RESERVE is at (row_r, col_r) going across,
#   They intersect at (row_r, col_t) if row_t <= row_r < row_t+9 AND col_r <= col_t < col_r+7
#   At intersection: TRANSFERS[row_r - row_t] must = RESERVE[col_t - col_r]

# Let me systematically find all possible intersections between each pair:

words_down = {
    1:  ('TRANSFERS',     9),
    2:  ('DEBTOR',        6),
    4:  ('VELOCITY',      8),
    5:  ('DUPONT',        6),
    6:  ('WORKINGCAPITAL',14),
    7:  ('QUICK',         5),
    9:  ('MONOPOLISTIC',  12),
    11: ('COMPLEMENTS',   11),
    12: ('INFERIOR',      8),
}

words_across = {
    3:  ('RESERVE',       7),
    8:  ('SUBSTITUTION',  12),
    10: ('FACTORING',     9),
    13: ('COLLECTIBILITY',14),
    14: ('FIDUCIARY',     9),
    15: ('PERPETUITY',    10),
}

print("=== FINDING INTERSECTIONS ===")
print()
for an, (aword, alen) in words_across.items():
    for dn, (dword, dlen) in words_down.items():
        for ai in range(alen):
            for di in range(dlen):
                if aword[ai] == dword[di]:
                    print(f"  {an}A-{dn}D: {aword}[{ai}]={dword}[{di}]={dword[di]}  (across pos {ai}, down pos {di})")

print()
print("=== KEY INTERSECTIONS SUMMARY ===")
# Now let's design the grid layout based on these intersections

# After analysis, here's the planned layout:
# 
# SUBSTITUTION (8A) at row=0, col=0:  S-U-B-S-T-I-T-U-T-I-O-N
# TRANSFERS (1D)   at row=0, col=4:  T(down)... -> SUBSTITUTION[4]=T matches TRANSFERS[0]=T ✓
# QUICK (7D)       at row=0, col=5:  Q... no, SUBSTITUTION[5]=I not Q
#
# Let me think more carefully...
#
# SUBSTITUTION: S(0)U(1)B(2)S(3)T(4)I(5)T(6)U(7)T(8)I(9)O(10)N(11)
# TRANSFERS:    T(0)R(1)A(2)N(3)S(4)F(5)E(6)R(7)S(8)
#   TRANSFERS[0]=T = SUBSTITUTION[4]=T -> TRANSFERS at col=col_sub+4, row intersects sub row
#   TRANSFERS[3]=N = SUBSTITUTION[11]=N -> TRANSFERS at col=col_sub+11
# 
# RESERVE: R(0)E(1)S(2)E(3)R(4)V(5)E(6)
#   TRANSFERS[1]=R = RESERVE[0]=R -> If TRANSFERS at col C, RESERVE[0]=R at (row_T+1, C)
#                                     => RESERVE starts at col=C (or C = col_T)
#   TRANSFERS[7]=R = RESERVE[0]=R -> RESERVE starts at row_T+7, col=col_T
#   TRANSFERS[7]=R = RESERVE[4]=R -> RESERVE starts at (row_T+7, col_T-4) 
#
# Let me set SUBSTITUTION at row=4, col=0
# SUBSTITUTION[4]=T at (4, 4) -> TRANSFERS[0]=T -> TRANSFERS starts at (4, 4) going down
# TRANSFERS goes: (4,4)=T (5,4)=R (6,4)=A (7,4)=N (8,4)=S (9,4)=F (10,4)=E (11,4)=R (12,4)=S
#
# RESERVE: R(0)E(1)S(2)E(3)R(4)V(5)E(6)
#   Need R from TRANSFERS -> TRANSFERS[1]=R at (5,4) -> RESERVE starts at (5,4) going across
#   RESERVE: (5,4)=R (5,5)=E (5,6)=S (5,7)=E (5,8)=R (5,9)=V (5,10)=E
#   OR TRANSFERS[7]=R at (11,4) -> RESERVE starts at (11,4) or (11,0)
#   Let's use TRANSFERS[1]=R at (5,4) for RESERVE start -> RESERVE row=5, col=4
#   
# DEBTOR: D(0)E(1)B(2)T(3)O(4)R(5)
#   RESERVE[1]=E at (5,5) -> DEBTOR[1]=E -> DEBTOR starts at (4,5) going down
#   DEBTOR: (4,5)=D (5,5)=E (6,5)=B (7,5)=T (8,5)=O (9,5)=R
#   But SUBSTITUTION[5]=I at (4,5)... DEBTOR[0]=D != I -> CONFLICT
#
# Let me try different placement. Let me use SUBSTITUTION at row=4, col=2:
# SUBSTITUTION: S(4,2) U(4,3) B(4,4) S(4,5) T(4,6) I(4,7) T(4,8) U(4,9) T(4,10) I(4,11) O(4,12) N(4,13)
# TRANSFERS[0]=T = SUBSTITUTION[4]=T at (4,6) -> TRANSFERS starts at (4,6)
# TRANSFERS: T(4,6) R(5,6) A(6,6) N(7,6) S(8,6) F(9,6) E(10,6) R(11,6) S(12,6)
#
# RESERVE[0]=R at (5,6) (=TRANSFERS[1]=R) -> RESERVE starts at (5,6)
# RESERVE: R(5,6) E(5,7) S(5,8) E(5,9) R(5,10) V(5,11) E(5,12)
#
# VELOCITY: V(0)E(1)L(2)O(3)C(4)I(5)T(6)Y(7)
#   RESERVE[5]=V at (5,11) -> VELOCITY[0]=V -> VELOCITY starts at (5,11) going down
#   VELOCITY: V(5,11) E(6,11) L(7,11) O(8,11) C(9,11) I(10,11) T(11,11) Y(12,11)
#
# FACTORING: F(0)A(1)C(2)T(3)O(4)R(5)I(6)N(7)G(8)
#   TRANSFERS[5]=F at (9,6) -> FACTORING[0]=F -> FACTORING starts at (9,6) going across
#   FACTORING: F(9,6) A(9,7) C(9,8) T(9,9) O(9,10) R(9,11) I(9,12) N(9,13) G(9,14)
#   Check: VELOCITY[4]=C at (9,11) -> FACTORING[5]=R at (9,11)? C!=R -> CONFLICT
#
#   Try: FACTORING[5]=R = TRANSFERS[5]=F? No...
#   FACTORING[0]=F = TRANSFERS[5]=F at (9,6)? Yes! Across... but FACTORING would start at (9,6)
#   Actually that gave conflict with VELOCITY. Let me check differently.
#   
#   VELOCITY[4]=C at (9,11). FACTORING[2]=C. So FACTORING could intersect VELOCITY at (9,11)
#   with FACTORING[2]=C. Then FACTORING starts at (9,9) going across.
#   FACTORING: F(9,9) A(9,10) C(9,11) T(9,12) O(9,13) R(9,14) I(9,15) N(9,16) G(9,17)
#   But then FACTORING[0]=F... Does TRANSFERS cover (9,9)? TRANSFERS is at col=6, row 4-12.
#   TRANSFERS at (9,6)=F. FACTORING at (9,9)=F. These don't intersect. That's ok.
#   But we need FACTORING to intersect some DOWN words too.
#
# This is getting complex. Let me use a proper algorithmic approach.

print()
print("=== TRYING ALGORITHMIC PLACEMENT ===")

# I'll use a backtracking solver approach
# Represent grid as dict of (row,col) -> letter
# Place words one by one, verify intersections

import copy

def try_placement(across_placements, down_placements):
    """Build grid from placements and verify all intersections."""
    grid = {}
    conflicts = []
    
    for num, (word, row, col) in across_placements.items():
        for i, c in enumerate(word):
            key = (row, col+i)
            if key in grid and grid[key] != c:
                conflicts.append(f"CONFLICT at {key}: existing={grid[key]}, new={c} (word {num}A={word})")
            grid[key] = c
    
    for num, (word, row, col) in down_placements.items():
        for i, c in enumerate(word):
            key = (row+i, col)
            if key in grid and grid[key] != c:
                conflicts.append(f"CONFLICT at {key}: existing={grid[key]}, new={c} (word {num}D={word})")
            grid[key] = c
    
    return grid, conflicts

def print_grid(grid):
    if not grid:
        print("(empty grid)")
        return
    min_r = min(r for r,c in grid)
    max_r = max(r for r,c in grid)
    min_c = min(c for r,c in grid)
    max_c = max(c for r,c in grid)
    for r in range(min_r, max_r+1):
        row_str = ""
        for c in range(min_c, max_c+1):
            row_str += (grid.get((r,c), '.') + " ")
        print(f"  {r:2d}: {row_str}")

def verify_intersections(across_placements, down_placements):
    """Check all cells that are covered by both an across and down word."""
    errors = []
    oks = []
    for an, (aword, ar, ac) in across_placements.items():
        for dn, (dword, dr, dc) in down_placements.items():
            # Check if they intersect
            # Across covers row=ar, cols ac to ac+len-1
            # Down covers col=dc, rows dr to dr+len-1
            if ar >= dr and ar < dr + len(dword) and dc >= ac and dc < ac + len(aword):
                # They intersect at (ar, dc)
                al = aword[dc - ac]
                dl = dword[ar - dr]
                if al == dl:
                    oks.append((ar, dc, al, f"{an}A[{dc-ac}]", f"{dn}D[{ar-dr}]"))
                else:
                    errors.append((ar, dc, al, dl, f"{an}A", f"{dn}D"))
    return oks, errors


# Final verified layout attempt
# Let me carefully construct from scratch using known intersections:
#
# SUBSTITUTION(8A): S-U-B-S-T-I-T-U-T-I-O-N  (length 12)
# TRANSFERS(1D):    T-R-A-N-S-F-E-R-S          (length 9)
# TRANSFERS[0]=T = SUBSTITUTION[4]=T
# => If SUBSTITUTION at (row_s, col_s), TRANSFERS starts at (row_s, col_s+4)
#
# RESERVE(3A): R-E-S-E-R-V-E (length 7)
# TRANSFERS[1]=R = RESERVE[0]=R  
# => RESERVE starts at (row_s+1, col_s+4)
#
# DEBTOR(2D): D-E-B-T-O-R (length 6)
# RESERVE[1]=E = DEBTOR[?]
#   DEBTOR[1]=E -> DEBTOR starts at (row_s+1-1, col_s+4+1) = (row_s, col_s+5)
#   Check: SUBSTITUTION at (row_s, col_s+5)=I (pos 5 of SUBSTITUTION). DEBTOR[0]=D != I CONFLICT
#   DEBTOR[4]=O? RESERVE[1]=E != O. No.
# RESERVE[3]=E = DEBTOR[1]=E -> DEBTOR starts at (row_s, col_s+7) 
#   Check SUBSTITUTION[col_s+7 - col_s] = SUBSTITUTION[7] = U. DEBTOR[0]=D != U CONFLICT
# 
# Let me look for DEBTOR intersections with ACROSS words:
# DEBTOR: D(0)E(1)B(2)T(3)O(4)R(5)
# SUBSTITUTION: S(0)U(1)B(2)S(3)T(4)I(5)T(6)U(7)T(8)I(9)O(10)N(11)
#   DEBTOR[2]=B = SUBSTITUTION[2]=B -> DEBTOR col = SUBSTITUTION col + 2, row_D <= row_S < row_D+6
#   -> DEBTOR[row_S - row_D] = B -> row_S - row_D = 2 -> row_D = row_S - 2
# So if SUBSTITUTION at (row_s, col_s), DEBTOR starts at (row_s-2, col_s+2)
# 
# RESERVE[?] = DEBTOR[?]:
#   RESERVE is at (row_s+1, col_s+4). DEBTOR col = col_s+2.
#   row_D <= row_R=row_s+1 < row_D+6  -> row_s-2 <= row_s+1 < row_s+4 -> 3 <= 3 ✓ (row_s+1 - row_s+2 = 3)
#   DEBTOR[3]=T, RESERVE[col_D - col_R] = RESERVE[col_s+2 - (col_s+4)] = RESERVE[-2] INVALID (col_D < col_R)
#   So DEBTOR col=col_s+2 < RESERVE start col=col_s+4 -> no intersection. OK, that's fine.
# 
# FACTORING(10A): F-A-C-T-O-R-I-N-G (length 9)
# TRANSFERS[5]=F = FACTORING[0]=F -> row of FACTORING = row_s+5, col = col_s+4
# FACTORING: F(row_s+5, col_s+4) A(row_s+5, col_s+5) C(row_s+5, col_s+6) T(row_s+5, col_s+7)
#            O(row_s+5, col_s+8) R(row_s+5, col_s+9) I(row_s+5, col_s+10) N(row_s+5, col_s+11) G(row_s+5, col_s+12)
#
# VELOCITY(4D): V-E-L-O-C-I-T-Y (length 8)
# RESERVE[5]=V = VELOCITY[0]=V -> VELOCITY starts at (row_s+1, col_s+4+5) = (row_s+1, col_s+9)
# VELOCITY: V(row_s+1, col_s+9) E(row_s+2,col_s+9) L(row_s+3,col_s+9) O(row_s+4,col_s+9) 
#           C(row_s+5,col_s+9) I(row_s+6,col_s+9) T(row_s+7,col_s+9) Y(row_s+8,col_s+9)
# Check with FACTORING(10A): FACTORING at row=row_s+5, and VELOCITY col=col_s+9
# FACTORING[col_s+9 - (col_s+4)] = FACTORING[5] = R
# VELOCITY[row_s+5 - (row_s+1)] = VELOCITY[4] = C
# R != C -> CONFLICT!
#
# Hmm. Let me try VELOCITY via a different intersection.
# FACTORING: F(0)A(1)C(2)T(3)O(4)R(5)I(6)N(7)G(8)
# VELOCITY: V(0)E(1)L(2)O(3)C(4)I(5)T(6)Y(7)
# VELOCITY[5]=I = FACTORING[6]=I -> If FACTORING at (row_f, col_f), VELOCITY at col = col_f+6
#   row_V <= row_f < row_V+8 -> row_V+5 = row_f -> row_V = row_f - 5
# 
# Let's try: Place FACTORING at row X (later), and VELOCITY 5 rows above FACTORING's row,
# at col = col_f + 6
#
# Actually let me try a completely different backbone. Let me use WORKINGCAPITAL(6D) as a spine
# since it's the longest word (14 letters).
# WORKINGCAPITAL: W-O-R-K-I-N-G-C-A-P-I-T-A-L
#
# WORKINGCAPITAL[2]=R = RESERVE[0]=R -> RESERVE starts at (row_W+2, col_W) across
#   RESERVE: R(row_W+2, col_W) E(row_W+2, col_W+1) S(row_W+2, col_W+2) E(row_W+2, col_W+3)
#            R(row_W+2, col_W+4) V(row_W+2, col_W+5) E(row_W+2, col_W+6)
#
# WORKINGCAPITAL[5]=N, WORKINGCAPITAL[7]=C, WORKINGCAPITAL[9]=P, WORKINGCAPITAL[12]=A
# 
# SUBSTITUTION[?] = WORKINGCAPITAL[?]: 
#   WORKINGCAPITAL[4]=I = SUBSTITUTION[5]=I -> SUBSTITUTION at row = row_W+4, col such that col+5 = col_W
#   -> col_s = col_W - 5; SUBSTITUTION: ...(row_W+4, col_W-5)...(row_W+4, col_W)...
#   At col_W: SUBSTITUTION[5]=I = WORKINGCAPITAL[4]=I ✓
#   SUBSTITUTION full: S(col_W-5)U(col_W-4)B(col_W-3)S(col_W-2)T(col_W-1)I(col_W)T(col_W+1)
#                      U(col_W+2)T(col_W+3)I(col_W+4)O(col_W+5)N(col_W+6)  all at row=row_W+4
#
# TRANSFERS[0]=T = SUBSTITUTION[4]=T at (row_W+4, col_W-1) -> TRANSFERS starts at (row_W+4, col_W-1)
# TRANSFERS: T(row_W+4,col_W-1) R(row_W+5,col_W-1) A(row_W+6,col_W-1) N(row_W+7,col_W-1)
#            S(row_W+8,col_W-1) F(row_W+9,col_W-1) E(row_W+10,col_W-1) R(row_W+11,col_W-1) S(row_W+12,col_W-1)
# 
# RESERVE at (row_W+2, col_W): R(col_W) E(col_W+1) S(col_W+2) E(col_W+3) R(col_W+4) V(col_W+5) E(col_W+6)
# Does TRANSFERS col (col_W-1) intersect RESERVE row (row_W+2)?
#   TRANSFERS is at col col_W-1, rows row_W+4 to row_W+12
#   RESERVE is at row row_W+2, cols col_W to col_W+6
#   col_W-1 is NOT in col_W to col_W+6 range -> No intersection. Good.
#
# WORKINGCAPITAL[2]=R intersects with RESERVE[0]=R at (row_W+2, col_W) ✓
#
# FACTORING: F(0)A(1)C(2)T(3)O(4)R(5)I(6)N(7)G(8)
#   WORKINGCAPITAL[7]=C = FACTORING[2]=C -> FACTORING at row=row_W+7, col such that col+2=col_W
#   -> col_f = col_W - 2; row_f = row_W + 7
#   FACTORING: F(col_W-2)A(col_W-1)C(col_W)T(col_W+1)O(col_W+2)R(col_W+3)I(col_W+4)N(col_W+5)G(col_W+6)
#              all at row=row_W+7
#   Check TRANSFERS at (row_W+7, col_W-1)=A (TRANSFERS[3]=N, row_W+7=row_W+4+3, TRANSFERS[3]=N)
#   FACTORING[col_W-1 - (col_W-2)] = FACTORING[1] = A. TRANSFERS[3]=N. A != N -> CONFLICT!
#
# Try FACTORING different intersection with WORKINGCAPITAL:
#   WORKINGCAPITAL[9]=P... no match in FACTORING
#   WORKINGCAPITAL[8]=A = FACTORING[1]=A -> FACTORING at row=row_W+8, col=col_W-1
#   FACTORING: F(col_W-1)A(col_W)C(col_W+1)T(col_W+2)O(col_W+3)R(col_W+4)I(col_W+5)N(col_W+6)G(col_W+7)
#              at row=row_W+8
#   Check TRANSFERS at (row_W+8, col_W-1)=S (TRANSFERS[4]=S)
#   FACTORING[col_W-1 - (col_W-1)] = FACTORING[0] = F. TRANSFERS[4]=S. F != S -> CONFLICT!
#
# Try WORKINGCAPITAL[12]=A = FACTORING[1]=A -> FACTORING at row=row_W+12, col=col_W-1
# But row_W+12 is the last row of WORKINGCAPITAL (index 12)
# TRANSFERS ends at row_W+12 too (TRANSFERS[8]=S at row_W+12)
# FACTORING at (row_W+12, col_W-1): F(col_W-1)...
# TRANSFERS col=col_W-1, row=row_W+12: TRANSFERS[8]=S
# FACTORING[0]=F != S -> CONFLICT!
#
# Let me try TRANSFERS differently. Place SUBSTITUTION at row=4, col=0:
# SUBSTITUTION: S(4,0)U(4,1)B(4,2)S(4,3)T(4,4)I(4,5)T(4,6)U(4,7)T(4,8)I(4,9)O(4,10)N(4,11)
# TRANSFERS[0]=T = SUBSTITUTION[4]=T at (4,4): TRANSFERS at (4,4) going down
# TRANSFERS: T(4,4)R(5,4)A(6,4)N(7,4)S(8,4)F(9,4)E(10,4)R(11,4)S(12,4)
#
# RESERVE[0]=R = TRANSFERS[1]=R at (5,4): RESERVE starts at (5,4)
# RESERVE: R(5,4)E(5,5)S(5,6)E(5,7)R(5,8)V(5,9)E(5,10)
#
# VELOCITY[0]=V = RESERVE[5]=V at (5,9): VELOCITY starts at (5,9) going down
# VELOCITY: V(5,9)E(6,9)L(7,9)O(8,9)C(9,9)I(10,9)T(11,9)Y(12,9)
#
# FACTORING: F-A-C-T-O-R-I-N-G
# Need to intersect VELOCITY: 
#   VELOCITY[4]=C = FACTORING[2]=C -> FACTORING at row=9, col=9-2=7
#   FACTORING: F(9,7)A(9,8)C(9,9)T(9,10)O(9,11)R(9,12)I(9,13)N(9,14)G(9,15) at row=9
#   Check TRANSFERS at (9,4)=F: TRANSFERS[5]=F. Col_T=4 not in FACTORING cols 7-15. No conflict ✓
#   VELOCITY[4]=C at (9,9) = FACTORING[2]=C at (9,9) ✓ MATCH!
#
# DEBTOR: D-E-B-T-O-R
#   SUBSTITUTION[2]=B = DEBTOR[2]=B -> col_D=2, DEBTOR[row_S - row_D] = B -> row_S - row_D = 2 -> row_D = 4-2=2
#   DEBTOR at (2,2) going down: D(2,2)E(3,2)B(4,2)T(5,2)O(6,2)R(7,2)
#   Check SUBSTITUTION at (4,2)=B: DEBTOR[2]=B ✓
#   Check RESERVE: RESERVE at row=5, cols 4-10. DEBTOR col=2 not in 4-10. No conflict ✓
#
# DUPONT: D-U-P-O-N-T
#   SUBSTITUTION[1]=U = DUPONT[1]=U -> col_dup=1, row_dup = 4-1=3
#   DUPONT at (3,1): D(3,1)U(4,1)P(5,1)O(6,1)N(7,1)T(8,1)
#   Check SUBSTITUTION at (4,1)=U: DUPONT[1]=U ✓
#   SUBSTITUTION[3]=S at (4,3). DUPONT col=1 != 3. No conflict.
#   Check DEBTOR col=2 vs DUPONT col=1. Different cols. No conflict ✓
#   DUPONT[5]=T at (8,1). Does anything else use (8,1)? TRANSFERS at (8,4)=S. Different col ✓
#
# WORKINGCAPITAL: W-O-R-K-I-N-G-C-A-P-I-T-A-L
#   RESERVE[2]=S... not in WORKINGCAPITAL
#   Let's try FACTORING[3]=T = WORKINGCAPITAL[11]=T -> nope, WORKINGCAPITAL has no T at index 11
#   WORKINGCAPITAL: W(0)O(1)R(2)K(3)I(4)N(5)G(6)C(7)A(8)P(9)I(10)T(11)A(12)L(13)
#   WORKINGCAPITAL[11]=T = FACTORING[3]=T -> col_W = col_F+3, row_W <= row_F < row_W+14
#     row_F - row_W = 11 means FACTORING at row=row_W+11... that's quite far down
#   WORKINGCAPITAL[2]=R = RESERVE[0]=R -> 
#     col_W = col_R, row_W+2 = row_R = 5 -> row_W = 3, col_W = 4 (RESERVE at (5,4))
#     WORKINGCAPITAL at (3,4): W(3,4)O(4,4)R(5,4)K(6,4)I(7,4)N(8,4)G(9,4)C(10,4)A(11,4)P(12,4)I(13,4)T(14,4)A(15,4)L(16,4)
#     Check TRANSFERS at col=4: T(4,4)R(5,4)A(6,4)N(7,4)S(8,4)F(9,4)E(10,4)R(11,4)S(12,4)
#     WORKINGCAPITAL[0]=W at (3,4). TRANSFERS doesn't reach (3,4) (starts at 4,4). OK ✓
#     WORKINGCAPITAL[1]=O at (4,4). TRANSFERS[0]=T at (4,4). O != T -> CONFLICT!
#
# Try WORKINGCAPITAL[4]=I = SUBSTITUTION[5]=I -> 
#   col_W = col_S+5 = 5, row_W+4 = row_S = 4 -> row_W = 0
#   WORKINGCAPITAL at (0,5): W(0,5)O(1,5)R(2,5)K(3,5)I(4,5)N(5,5)G(6,5)C(7,5)A(8,5)P(9,5)I(10,5)T(11,5)A(12,5)L(13,5)
#   Check SUBSTITUTION[5]=I at (4,5): WORKINGCAPITAL[4]=I ✓
#   Check RESERVE at row=5, cols 4-10: RESERVE covers col=5 at row=5. RESERVE[1]=E at (5,5).
#   WORKINGCAPITAL[5]=N at (5,5). E != N -> CONFLICT!
#
# Try WORKINGCAPITAL[8]=A:
#   FACTORING[1]=A = WORKINGCAPITAL[8]=A -> col_W = col_F+1, row_W = row_F - 8 = 9-8 = 1
#   col_F = 7, so col_W = 8. WORKINGCAPITAL at (1,8):
#   W(1,8)O(2,8)R(3,8)K(4,8)I(5,8)N(6,8)G(7,8)C(8,8)A(9,8)P(10,8)I(11,8)T(12,8)A(13,8)L(14,8)
#   Check RESERVE at (5,8): RESERVE[4]=R at (5,8). WORKINGCAPITAL[4]=I at (5,8). R!=I -> CONFLICT!
#
# Try WORKINGCAPITAL intersecting FACTORING differently:
#   FACTORING[8]=G = WORKINGCAPITAL[6]=G -> col_W = col_F+8, row_W = row_F-6 = 9-6=3
#   col_F=7, col_W=15. WORKINGCAPITAL at (3,15):
#   W(3,15)O(4,15)R(5,15)K(6,15)I(7,15)N(8,15)G(9,15)C(10,15)A(11,15)P(12,15)I(13,15)T(14,15)A(15,15)L(16,15)
#   FACTORING ends at (9,15)=G. WORKINGCAPITAL[6]=G at (9,15). G=G ✓!
#   Check other conflicts: VELOCITY at col=9, rows 5-12. WORKINGCAPITAL col=15. No conflict ✓
#   MONOPOLISTIC needs to go down-right...
#
# Good! Let's check MONOPOLISTIC:
# MONOPOLISTIC: M-O-N-O-P-O-L-I-S-T-I-C
# Intersections with ACROSS words:
#   FACTORING[5]=R... no
#   FACTORING[6]=I = MONOPOLISTIC[7]=I -> col_M = col_F+6 = 13, row_M <= 9 < row_M+12 
#     row_M+7 = 9 -> row_M = 2. MONOPOLISTIC at (2,13):
#     M(2,13)O(3,13)N(4,13)O(5,13)P(6,13)O(7,13)L(8,13)I(9,13)S(10,13)T(11,13)I(12,13)C(13,13)
#     FACTORING at row=9, MONOPOLISTIC col=13: FACTORING[col_M - col_F] = FACTORING[13-7]=FACTORING[6]=I
#     MONOPOLISTIC[9-row_M] = MONOPOLISTIC[9-2]=MONOPOLISTIC[7]=I. I=I ✓!
#     Check VELOCITY at (9,9)=C. MONOPOLISTIC col=13 != 9. OK ✓
#     Check TRANSFERS at (9,4)=F. MONOPOLISTIC col=13 != 4. OK ✓
#
# WORKINGCAPITAL at (3,15): col=15. MONOPOLISTIC col=13. Different. No conflict ✓
# 
# Now let's find FIDUCIARY (14A):
# FIDUCIARY: F-I-D-U-C-I-A-R-Y (length 9)
# WORKINGCAPITAL at col=15, rows 3-16. 
# WORKINGCAPITAL[9]=P... FIDUCIARY no P
# WORKINGCAPITAL[3]=K... no
# WORKINGCAPITAL[12]=A = FIDUCIARY[6]=A -> row_F14 = row_W+12, col_F14 such that col_W = col_F14+6
#   row_F14 = 3+12=15, col_F14 = 15-6=9
#   FIDUCIARY at (15,9): F(15,9)I(15,10)D(15,11)U(15,12)C(15,13)I(15,14)A(15,15)R(15,16)Y(15,17)
#   WORKINGCAPITAL[12]=A at (15,15). FIDUCIARY[6]=A at (15,15). A=A ✓!
#   Check VELOCITY col=9, rows 5-12. FIDUCIARY row=15, outside VELOCITY range. OK ✓
#
# COLLECTIBILITY: C-O-L-L-E-C-T-I-B-I-L-I-T-Y (length 14)
# WORKINGCAPITAL[13]=L = COLLECTIBILITY[2]=L -> 
#   col_C = col_W+13... wait WORKINGCAPITAL is going DOWN, so its row increases.
#   WORKINGCAPITAL[13]=L at (3+13, 15) = (16, 15). 
#   COLLECTIBILITY is ACROSS, so: row_C = 16, col_C such that col_C+2 = 15 -> col_C = 13
#   COLLECTIBILITY at (16,13): C(16,13)O(16,14)L(16,15)L(16,16)E(16,17)C(16,18)T(16,19)I(16,20)B(16,21)I(16,22)L(16,23)I(16,24)T(16,25)Y(16,26)
#   WORKINGCAPITAL[13]=L at (16,15). COLLECTIBILITY[2]=L at (16,15). L=L ✓!
#
# MONOPOLISTIC ends at (13,13)=C. COLLECTIBILITY at row=16, col=13. 
# COLLECTIBILITY col=13, row=16. MONOPOLISTIC col=13, rows 2-13. No overlap (row 16 > 13) ✓
#
# COMPLEMENTS: C-O-M-P-L-E-M-E-N-T-S (length 11)
# COLLECTIBILITY[0]=C = COMPLEMENTS[0]=C -> 
#   COMPLEMENTS starts at (row_C=16, col_C_start=13) wait COMPLEMENTS is DOWN
#   col_COMP = col_C_start = 13, row_COMP <= 16 < row_COMP+11 -> 
#   COMPLEMENTS[16-row_COMP] = C[0]=C = COLLECTIBILITY[0]=C
#   16-row_COMP = 0 -> row_COMP=16, but COMPLEMENTS starts at row=16 col=13
#   COLLECTIBILITY starts at (16,13). COMPLEMENTS at (16,13)=C. 
#   But COLLECTIBILITY[0]=C at (16,13). COMPLEMENTS[0]=C at (16,13). C=C ✓!
#   COMPLEMENTS: C(16,13)O(17,13)M(18,13)P(19,13)L(20,13)E(21,13)M(22,13)E(23,13)N(24,13)T(25,13)S(26,13)
#
# PERPETUITY: P-E-R-P-E-T-U-I-T-Y (length 10) 
# COMPLEMENTS[3]=P = PERPETUITY[0]=P -> 
#   row_PERP = row_COMP+3 = 19, col_PERP = col_COMP -> wait, PERPETUITY is ACROSS
#   row_PERP = 19, col such that col_COMP=13 covers it: col+0=13 -> PERPETUITY starts at (19,13)
#   PERPETUITY: P(19,13)E(19,14)R(19,15)P(19,16)E(19,17)T(19,18)U(19,19)I(19,20)T(19,21)Y(19,22)
#   COMPLEMENTS[3]=P at (19,13). PERPETUITY[0]=P at (19,13). P=P ✓!
#
# INFERIOR: I-N-F-E-R-I-O-R (length 8)
# PERPETUITY[7]=I = INFERIOR[0]=I or INFERIOR[5]=I
#   PERPETUITY[7]=I at (19,20). INFERIOR[0]=I -> INFERIOR starts at (19,20) going down
#   INFERIOR: I(19,20)N(20,20)F(21,20)E(22,20)R(23,20)I(24,20)O(25,20)R(26,20)
#   Good! Any conflicts? COLLECTIBILITY at row=16, INFERIOR col=20: COLLECTIBILITY covers cols 13-26.
#   COLLECTIBILITY[20-13]=COLLECTIBILITY[7]=I at (16,20). INFERIOR starts at row=19. No overlap ✓
#   PERPETUITY[7]=I at (19,20). INFERIOR[0]=I. I=I ✓!
#
# QUICK: Q-U-I-C-K (length 5)
# PERPETUITY[2]=R... no
# FACTORING[6]=I = QUICK[2]=I -> col_Q = col_F+6 = 13, row_Q+2 = 9 -> row_Q = 7
#   Wait MONOPOLISTIC is at (2,13). QUICK col=13 would conflict.
#   Let me find QUICK intersecting otherwise...
# FIDUCIARY[1]=I = QUICK[2]=I -> col_Q = col_F14+1 = 10, row_Q+2 = 15 -> row_Q=13
#   QUICK at (13,10): Q(13,10)U(14,10)I(15,10)C(16,10)K(17,10)
#   FIDUCIARY at row=15, FIDUCIARY[1]=I at (15,10). QUICK[2]=I at (15,10). I=I ✓!
#   COLLECTIBILITY at row=16, col=10: COLLECTIBILITY[10-13]... col 10 < col start 13. Not covered ✓
#   MONOPOLISTIC at col=13. QUICK col=10. No conflict ✓
#   VELOCITY at col=9, rows 5-12. QUICK col=10 != 9. No conflict ✓
#
# Now let me check WORKINGCAPITAL vs FIDUCIARY:
# WORKINGCAPITAL[11]=T at (14,15). FIDUCIARY at row=15. No overlap ✓
# WORKINGCAPITAL[10]=I at (13,15). QUICK col=10, row 13: QUICK[0]=Q at (13,10). col 15 != 10. No conflict ✓
#
# Let me also verify DEBTOR doesn't conflict:
# DEBTOR at (2,2): D(2,2)E(3,2)B(4,2)T(5,2)O(6,2)R(7,2)
# SUBSTITUTION at row=4, covers cols 0-11. (4,2)=B. DEBTOR[2]=B. SUBSTITUTION[2]=B. B=B ✓!
#
# DUPONT: D(3,1)U(4,1)P(5,1)O(6,1)N(7,1)T(8,1)
# SUBSTITUTION at (4,1)=U. DUPONT[1]=U. SUBSTITUTION[1]=U. U=U ✓!
# DEBTOR at col=2, DUPONT at col=1. No conflict ✓
#
# Now verify all words again with explicit coords:
print()
print("=== FINAL LAYOUT ===")
print()

across_final = {
    3:  ('RESERVE',        5, 4),    # row=5, col=4
    8:  ('SUBSTITUTION',   4, 0),    # row=4, col=0
    10: ('FACTORING',      9, 7),    # row=9, col=7
    13: ('COLLECTIBILITY', 16, 13),  # row=16, col=13
    14: ('FIDUCIARY',      15, 9),   # row=15, col=9
    15: ('PERPETUITY',     19, 13),  # row=19, col=13
}

down_final = {
    1:  ('TRANSFERS',       4, 4),   # row=4, col=4
    2:  ('DEBTOR',          2, 2),   # row=2, col=2
    4:  ('VELOCITY',        5, 9),   # row=5, col=9
    5:  ('DUPONT',          3, 1),   # row=3, col=1
    6:  ('WORKINGCAPITAL',  3, 15),  # row=3, col=15
    7:  ('QUICK',           13, 10), # row=13, col=10
    9:  ('MONOPOLISTIC',    2, 13),  # row=2, col=13
    11: ('COMPLEMENTS',     16, 13), # row=16, col=13
    12: ('INFERIOR',        19, 20), # row=19, col=20
}

grid_final, conflicts_final = try_placement(across_final, down_final)
oks, errors = verify_intersections(across_final, down_final)

print("INTERSECTIONS:")
for (r,c,l,an,dn) in oks:
    print(f"  ✓ ({r:2d},{c:2d})={l}  {an} ∩ {dn}")

if errors:
    print("\nCONFLICTS:")
    for (r,c,al,dl,an,dn) in errors:
        print(f"  ✗ ({r:2d},{c:2d}) {an}={al} vs {dn}={dl}")

if conflicts_final:
    print("\nPLACEMENT CONFLICTS:")
    for c in conflicts_final:
        print(f"  {c}")

print()
print("GRID:")
print_grid(grid_final)

print()
print(f"Total cells: {len(grid_final)}")
print(f"Grid bounds: rows {min(r for r,c in grid_final)}-{max(r for r,c in grid_final)}, cols {min(c for r,c in grid_final)}-{max(c for r,c in grid_final)}")
