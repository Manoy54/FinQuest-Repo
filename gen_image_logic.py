across = {3: 'RESERVE', 8: 'SUBSTITUTION', 10: 'FACTORING', 13: 'COLLECTIBILITY', 14: 'FIDUCIARY', 15: 'PERPETUITY'}
down = {1: 'TRANSFERS', 2: 'DEBTOR', 4: 'VELOCITY', 5: 'DUPOINT', 6: 'WORKINGCAPITAL', 7: 'QUICK', 9: 'MONOPOLISTIC', 11: 'COMPLEMENTS', 12: 'INFERIOR'}
placements = {}

R_6D, C_6D = 0, 0
placements[6] = ('D', 6, R_6D, C_6D, down[6])

# 8A crosses 6D at O (8A index 10, 6D index 1)
R_8A = R_6D + 1
C_8A = C_6D - 10
placements[8] = ('A', 8, R_8A, C_8A, across[8])

R_1D = R_8A - 4
C_1D = C_8A + 3
placements[1] = ('D', 1, R_1D, C_1D, down[1])

R_5D = R_8A - 1
C_5D = C_8A + 1
placements[5] = ('D', 5, R_5D, C_5D, down[5])

R_2D = R_8A - 3
C_2D = C_8A + 6
placements[2] = ('D', 2, R_2D, C_2D, down[2])

# 10A perfectly aligned with K of 6D (index 3) and 1 gap
R_10A = R_6D + 3
C_10A = C_6D + 2
placements[10] = ('A', 10, R_10A, C_10A, across[10])

R_7D = R_10A - 3
C_7D = C_10A + 2
placements[7] = ('D', 7, R_7D, C_7D, down[7])

R_9D = R_10A - 3
C_9D = C_10A + 4
placements[9] = ('D', 9, R_9D, C_9D, down[9])

R_4D = R_10A - 5
C_4D = C_10A + 6
placements[4] = ('D', 4, R_4D, C_4D, down[4])

# 3A crosses 4D at E (4D index 1, 3A index 6)
R_3A = R_4D + 1
C_3A = C_4D - 6
placements[3] = ('A', 3, R_3A, C_3A, across[3])

# 13A crosses 9D MONOPOLISTIC at I (9D index 7, 13A index 11)
R_13A = R_9D + 7
C_13A = C_9D - 11
placements[13] = ('A', 13, R_13A, C_13A, across[13])

# 11D COMPLEMENTS crosses 13A at E (13A index 4, 11D index 5)
R_11D = R_13A - 5
C_11D = C_13A + 4
placements[11] = ('D', 11, R_11D, C_11D, down[11])

# 14A FIDUCIARY crosses 9D at I (9D index 10, 14A index 1)
R_14A = R_9D + 10
C_14A = C_9D - 1
placements[14] = ('A', 14, R_14A, C_14A, across[14])

# 12D crosses 14A at R (14A index 7, 12D index 4)
R_12D = R_14A - 4
C_12D = C_14A + 7
placements[12] = ('D', 12, R_12D, C_12D, down[12])

# 15A PERPETUITY crosses 11D at T (11D index 9, 15A index 5)
R_15A = R_11D + 9
C_15A = C_11D - 5
placements[15] = ('A', 15, R_15A, C_15A, across[15])

grid = {}
conflicts = []
for k, (d, num, r, c, w) in placements.items():
    for i, ch in enumerate(w):
        rr = r if d=='A' else r+i
        cc = c+i if d=='A' else c
        if (rr,cc) in grid and grid[(rr,cc)] != ch: conflicts.append(f'Conflict at {rr},{cc} ({w} vs {grid[(rr,cc)]})')
        grid[(rr,cc)] = ch

if conflicts: print('Conflicts:', conflicts)
else: print('NO CONFLICTS! PERFECT LAYOUT')

min_r, max_r = min(x[0] for x in grid.keys()), max(x[0] for x in grid.keys())
min_c, max_c = min(x[1] for x in grid.keys()), max(x[1] for x in grid.keys())
for r in range(min_r, max_r+1):
    print(f'{r:2d}: ' + ' '.join(grid.get((r,c), '.') for c in range(min_c, max_c+1)))

for k, (d, num, r, c, w) in placements.items():
    nr, nc = r - min_r, c - min_c
    print(f"{{ number: {num}, direction: '{'across' if d=='A' else 'down'}', text: '', answer: '{w}', row: {nr}, col: {nc} }},")
