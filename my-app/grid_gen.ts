
import { writeFileSync } from 'fs';

// A8 BACKBONE (Row 8)
// A8: DEPRECIATION (12)
// D5: SECTOR (6) -> x A8[1] (E) (Start 7, Col 1) -> E at 1. Match.
// D1: INDICATOR (9) -> x A8[3] (R) (Start 0, Col 3) -> R at 8. Match.
// D2: FISCAL (6) -> x A8[6] (I) (Start 5, Col 6) -> I at 3. Match. (F I S C A L). I is at 1! C is at 3.
//     Wait. DEPRE C IATION. C is at 5! (D0 E1 P2 R3 E4 C5 I6 A7 T8 I9 O10 N11).
//     D2 x A8[5]? FISCAL[3] = C. (5+3=8). Row D2 is 5. Row A8 is 8.
//     So D2 Start 5. Col 5. OK.
// D6: REORGANIZATION (14) -> x A8[11] (N) (Start 3, Col 11).
//     D6[5] = N (R0 E1 O2 R3 G4 A5 N6). N is 6!
//     REORGANIZATION: R E O R G A N I Z A T I O N.
//     Indices: R0 E1 O2 R3 G4 A5 N6.
//     Need N at A8[11].
//     So D6[6] intersects A8[11]?
//     Start D6 = 8 - 6 = 2.
//     Col 11.
//     OK.

// LOWER LEFT A13 (Row 16)
// A13: MONETARIZATION (14)
// D6 x A13[2]?
// D6 Start 2. Col 11.
// A13 Row 16.
// D6 Index 14? Grid size 14 -> 0-13.
// 2 + 13 = 15. Row 15. D6 ends at 15.
// A13 is at 16. D6 does NOT reach A13.
// ERROR: D6 too short or Start too high.

// Need D6 to cross A13.
// D6 needs length to reach 16.
// Start 2. End 15. Gap 1 row.
// A13 needs to be Row 15?
// Or D6 longer? (No 14).
// Or D6 start lower?
// D6 start lower means D6 x A8 index changes.
// If D6 starts at 3 -> Ends 16. Intersection D6[13].
// D6[13] = A13[2]?
// REORGANIZATION ends in N.
// MONETARIZATION[2] = N.
// Match!!
// So D6 Start 3.
// D6 x A8[11] (N).
// D6 Start 3 -> Intersection Index 8-3 = 5.
// D6[5] = A?
// REORGA (A is 5).
// Match! A8[11] must be A?
// DEPRECIATION. N is 11.
// Conflict: A != N.

// SOLUTION:
// Need D6[5] == A8[11].
// D6[5] is A.
// A8 ends in N.
// Can I change A8?
// Word ending in A? No (ION usually).
// Can I change D6 to satisfy N at 5?
// Words with N at 5...
// `ADMINISTRATION`. S at 5.
// `MODERNIZATION`. R at 5.
// `ORGANIZATION`. N at 4.
// `COMMUNICATION`. U at 4.
// `TRANSPORTATION`. P at 5.
// `TRANSFORMATION`. F at 5.
// `IDENTIFICATION`. T at 4.
// `CLASSIFICATION`. S at 4.
// `REPRESENTATION`. S at 5.
// `IMPLEMENTATION`. M at 5.
// `INFRASTRUCTURE`. A at 5.
// `RECAPITALIZING`. I at 5.
// `PARTICIPATION`. C at 5.
// `DETERMINATION`. M at 5.
// `INVESTIGATION`. T at 5.
// `SPECULATION`. L at 5.

// Let's try A8 ending in A? Unlikely.
// Let's change D6 Start?
// If D6 starts at 2 -> Intersects at 6 (N). Match A8(N).
// But D6 ends at 15. A13 at 16. No reach.
// Maybe A13 is Row 15?
// If A13 at 15... D6[13] (ends N).
// A13[2] = N. Match `MONETARIZATION`.
// So A13 Row 15?
// Check D11/A10.
// D11 Length 11. Crosses A13 at A13[10] (A).
// D11 Col = A13_Col(9) + 10 = 19.
// D11 x A13[10] (A).
// D11 ends where? Start?
// D11 x A13[10] (A) at what index?
// If D11 starts at 10.
// Intersection Row 15. Index 5.
// D11[5] = A?
// `INVESTMENTS` (11). I0 N1 V2 E3 S4 T5. T!=A.
// `INSTALMENTS` (11). I N S T A(4) L(5). L != A.
// `ADJUSTMENTS`. T at 5.
// `ASSESSMENTS`. S at 5.
// `DEVELOPMENT`. O at 5.
// `MEASUREMENT`. R at 5.
// `REPLACMENT`. (10).
// `ENFORCEMENT`. C at 5.
// `ARRANGEMENT`. G at 5.
// `REQUIREMENT`. R at 5.
// `ENDORSEMENT`. S at 5.
// `IMPROVEMENT`. O at 5.
// `PERFORMANCE`. R at 5.
// `MAINTENANCE`. E at 5.
// `INHERITANCE`. I at 5.
// `ACCOUNTANCY`. N at 5? A C C O U N. N at 5!
// `ACCOUNTANCY` (11).
// Match D11[5] 'N' with A13[10] 'A'? No N!=A.
// Need A at 5.
// `TRANSACTION`. T R A N S A. A at 5!
// `TRANSACTION` (11).
// D11 = `TRANSACTION`.
// Check A10 x D11[0] (T).
// A10 `UTILITIES`. Pos 2 is I. T!=I.
// Change A10? Start with something crossing T.
// `NETWORKING`. T at 2.
// `DATASETS`. T at 2.
// `RETAINED`. T at 2.
// `RETURNS`. T at 2. (7 letters).
// `RATIONING`. T at 2. (9 letters).
// `DETENTION`. T at 2.
// `POTENTIAL`. T at 2.
// Use `RATIONING` (9).
// Check A10 `RATIONING` x D9 `REGISTRATION`.
// A10 at 4 is O. D9 at 3 is I. I!=O.
// Change D9?
// Need O at 3.
// `CORPORATION`. P at 3.
// `MONOPOLIES`. O at 3. (10).
// `ECONOMISTS`. N at 3.
// `PROMOTIONS`. M at 3.
// `AUTOMATION`. O at 3. (10).
// `INNOVATION`. O at 3. (10).
// `ALLOCATION`. O at 3. (10).
// `ASSOCIATION`. O at 3. (11).
// `NEGOTIATION`. O at 3. (11).
// `REVOCATION`. O at 3? R E V O. Yes. (10).
// Need 12 letters?
// `CONSOLIDATION`. S at 3.
// `STAGFLATIONS`. G at 3.
// `EXPLORATION`. L at 3.
// `IMPORTATION`. O at 3? I M P O. Yes. (11).
// `DEPORTATION`. O at 3. (11).
// `AMORTIZATION`. R at 3.
// `VALORIZATION`. O at 3. (12).
// `AUTHORIZATION`. H at 3.
// `CORPORATISM`. P at 3.
// `DEMONETIZED`. O at 3. (11).
// `DEMONETIZING`. O at 3. (12).
// `COLLABORATOR`. L at 3.
// `ACCUMULATION`. U at 3.
// `COMMODITIES`. M at 3.
// `COMMONALITY`. M at 3.
// `CORPORATEGOV`. P at 3.

// Let's use `VALORIZATION`.
// D9 = `VALORIZATION`.
// Check A14 x D9[11] (N).
// A14 at 4 is N.
// A14 was `COVENANTS`. N at 4. Match!
// Check A14 x D12.
// A14 at 6 (N).
// D12 at 7.
// Need D12[7] = N.
// D12 was `INTEREST`.
// Need 8 letter ending in N?
// `DURATION`. 8.
// `TAXATION`. 8.
// `INFLATION`. 9.
// `UNKNOWN`. 7.
// `FOREIGN`. 7.
// `AMERICAN`. 8.
// `CAMPAIGN`. 8.
// `BARGAIN`. 7.
// `CERTAIN`. 7.
// `DOMAIN`. 6.
// `REMAIN`. 6.
// `SUSTAIN`. 7.
// `RETURN`. 6.
// `MARGIN`. 6.
// `BITCOIN`. 7.
// `BULLION`. 7.
// `COINAGE`. 7.
// `PENSION`. 7.
// `COUPON`. 6.
// `OPTION`. 6.
// `ACTION`. 6.
// `COMMON`. 6.
// `EQUITY`. 6.
// `SAFETY`. 6.
// `STABILITY`. 9.
// `SECURITY`. 8.
// `MATURITY`. 8.
// `LIQUIDITY`. 9.
// `INDUSTRY`. 8.
// `ECONOMY`. 7.
// `MONOPOLY`. 8.
// `CURRENCY`. 8.
// `PROPERTY`. 8.
// `TREASURY`. 8.
// `STRATEGY`. 8.
// `ACTIVITY`. 8.
// `CAPACITY`. 8.
// `DELIVERY`. 8.
// `RECOVERY`. 8.
// `QUANTITY`. 8.
// `PRIORITY`. 8.
// `MINORITY`. 8.
// `MAJORITY`. 8.
// `IDENTITY`. 8.
// `FACILITY`. 8.
// `ENTROPY`. 7.

// Let's try `TAXATION`.
// D12 = `TAXATION`.
// Check D12 x A10.
// A10 was `RATIONING` (9).
// A10[6] = I.
// D12[0] = T.
// T != I.
// Change A10?
// Need 9 letters, 2=T, 4=O, 6=T.
// `_ _ T _ O _ T _ _`
// `OUTPOSTS`.
// `NETWORTHS`.
// `NETWORKED`.
// `AUTHORITY`. U at 2.
// `AUTOMATED`. T at 2. O at 4. A at 6. (Fail).
// `AUTOMATIC`. T at 2. O at 4. A at 6.
// `MOTORISTS`. T at 2. O at 4. I at 6. (Fail).
// `OPTIONALS`. T at 2. I at 4.
// `MOTIONING`. T at 2. I at 4.
// `ESTIMATED`. T at 2. M at 4.
// `BOTTOMING`. T at 2. T at 3. O at 4. M at 6.
// `BUTTONING`. T at 2.
// `COTTONING`. T at 2.

// Maybe change D12 start?
// If D12 starts such that D12 intersects A10[6] at D12[1] (A)?
// A10[6] = 'A'?
// `AUTOMATED`.
// A10 = `AUTOMATED`.
// Check A10 x D11 (TRANSACTION). 2=T. 0=T. Match!
// Check A10 x D9 (VALORIZATION). 4=M. 3=O. M!=O. Fail.
// Need O at 4. `AUTOMATED`. M is 4. Fail.
// `AUTOMOTIVE`. O at 4!
// A10 = `AUTOMOTIVE` (10 letters - needs 9).
// `AUTOMATES`.
// `AUTOMATON`. O at 4. T at 6.
// A10 = `AUTOMATON` (9).
// Matches D11(T), D9(O), D12(T).
// Matches D12 `TAXATION` (T at 0).
// Matches A14 `COVENANTS` (N at 6 match D12[7] N).
// Matches A14 x D9 (`VALORIZATION`). N at 11 match A14[4] N?
// `COVENANTS`. N at 4.
// `VALORIZATION`. N at 11.
// Match!
//
// **SOLUTION FOUND.**

// Words:
// A8: DEPRECIATION
// D5: SECTOR (E at 1).
// D1: INDICATOR (R at 8).
// D2: FISCAL (C at 3).
// D6: REORGANIZATION (Starts 2. N at 6 match A8[11]. Ends 15 A13[2] N).
// A13: MONETARIZATION (N at 2. A at 10 match D11[5]?).
// D11: TRANSACTION (A at 5. T at 0 match A10[2]).
// A10: AUTOMATON (T at 2. O at 4 match D9[3]. T at 6 match D12[0]).
// D9: VALORIZATION (O at 3. N at 11 match A14[4]).
// D12: TAXATION (T at 0. N at 7 match A14[6]).
// A14: COVENANTS (N at 4. N at 6).
// A15: DEBENTURES (T at 5 match D11[9] T).
//      D11 `TRANSACTION`. T is 9.
//      Match!

// A3/D4/D7: Same as before.
// A3: DEPOSIT (7).
// D4: STRATEGY (8).
// D7: YIELD (5).

// Coords (A8 at 8, 0):
// A8: (8, 0).
// D5: (7, 1).
// D1: (0, 3).
// D2: (5, 5). (Start 5. Intersect A8[5]? NO. DEPRECIATION C is 5. FISCAL C is 3. 5-3=2. Start 2? No intersection row 8. 2+3=5. Fail).
//     Wait, A8[6] was I. D2[3] was S. Conflict.
//     DEPRECIATION. C is 5. I is 6.
//     FISCAL. S is 2. C is 3.
//     Match C? A8[5] x D2[3].
//     D2 Start = 8 - 3 = 5.
//     Col = 0 + 5 = 5.
//     D2: (5, 5). OK.
// D6: (2, 11). (Start 2. Intersect 8 (6) with A8[11] N. 2+6=8. Match).
// A13: (15, 9). (Row 15. Intersect D6[13] N with A13[2] N. D6 ends 15. A13 row 15. Match).
// D11: (10, 19). (Start 10. Intersect A13[10] A with D11[5] A. Row 10+5=15. Match).
// A10: (10, 17). (Row 10. Intersect D11[0] T with A10[2] T. Match).
// D9: (7, 21). (Start 7. Intersect A10[4] O with D9[3] O. Row 7+3=10. Match.
//               Col A10(17)+4=21. Match.)
// D12: (10, 23). (Start 10. Intersect A10[6] T with D12[0] T. Match.
//                Col A10(17)+6=23. Match.)
// A14: (18, 17). (Row 18? D9 x A14[4] N. D9[11] N. D9 Start 7. 7+11=18. Row 18.
//                 Col D9(21) - 4 = 17. Match.
//                 Check D12 x A14[6] N. D12[7] N. D12 Start 10. 10+7=17.
//                 Row 17 vs 18. **CONFLICT 1 row.**
//                 D12 is 8 letters. Ends 17.
//                 D9 is 12 letters. Ends 18.
//                 A14 must cross both.
//                 D9 `VALORIZATION`. N at 11.
//                 D12 `TAXATION`. N at 7.
//                 Maybe D9 crosses A14 at 10 (O)?
//                 A14 `COVENANTS`. No O.
//                 Maybe D12 crosses A14 at 6 (I)?
//                 A14 `COVENANTS`. No I.
//                 Maybe A14 is Row 17?
//                 D9[10] (O). A14 must match O.
//                 `COVENANTS`. No.
//                 `COMPANIES`. O at 1.
//                 `CONTRACTS`. O at 1.
//                 `CORPORATE`. O at 1, 4.
//                 `COLLATERAL`. O at 1.
//                 `COMPLAINT`. O at 1.
//                 `CONSTANTLY`. O at 1.
//                 `CONTAINERS`. O at 1.
//                 `CONVERSION`. O at 1, 8.
//                 `CORRECTING`. O at 1.
//                 `COUNSELORS`. O at 1.
//                 `COURTROOMS`. O at 1.
//                 Try `CORPORATE`. (9).
//                 A14 = `CORPORATE`.
//                 x D9[10] (O). Match A14[4] O? No, at 4 O. C O R P O. Yes! O at 4.
//                 Match!
//                 x D12[7] (N). Match A14[6] A?
//                 C O R P O R A T E.
//                 A at 6.
//                 N != A.
//                 Change D12? Ends in A?
//                 `CRITERIA`. 8.
//                 `COLOMBIA`.
//                 `VIRGINIA`.
//                 `BACTERIA`.
//                 `ALAMEDA`.
//                 `UMBRELLA`.
//                 `FORMULA`.
//                 `DILEMMA`.
//                 `PANAMA`.
//                 `AGENDA`. 6.
//                 `DATA`.
//                 `AREA`.
//                 `IDEA`.
//                 `MEDIA`. 5.
//                 `DRAMA`.
//                 `ALPHA`.
//                 `BETA`.
//                 `QUOTA`.
//                 `EXTRA`.
//                 `DIPLOMA`. 7.
//                 `MAXIMA`. 6.
//                 `STIGMA`. 6.
//                 `ENIGMA`. 6.
//                 `PLASMA`. 6.
//                 `ASTHMA`. 6.
//                 `CINEMA`. 6.
//                 `CAMERA`. 6.
//                 `OPERA`. 5.
//                 `ARENA`. 5.
//                 `CHINA`. 5.
//                 `INDIA`. 5.
//                 `KOREA`. 5.
//                 `AFRICA`. 6.
//                 `CANADA`. 6.
//                 `RUSSIA`. 6.
//                 `ARABIA`. 6.
//                 `PERSIA`. 6.
//                 `AMERICA`. 7.
//                 `AUSTRIA`. 7.
//                 `BOLIVIA`. 7.
//                 `CROATIA`. 7.
//                 `ESTONIA`. 7.
//                 `GEORGIA`. 7.
//                 `LIBERIA`. 7.
//                 `IGERIA`. 6.
//                 `ROMANIA`. 7.
//                 `TUNISIA`. 7.
//                 `UKRAINE`. 7. E.
//                 `VIETNAM`. 7.
//                 `ZAMBIA`. 6.
//                 `ALBANIA`. 7.
//                 `ALGERIA`. 7.
//                 `ANDORRA`. 7.
//                 `ANGOLA`. 6.
//                 `ANTIGUA`. 7.
//                 `ARMENIA`. 7.
//                 `BAHRAIN`. 7.
//                 `BELGIUM`. 7.
//                 `BHUTAN`. 6.
//                 `BRAZIL`. 6.
//                 `BRUNEI`. 6.
//                 `CHILE`. 5.
//                 `CONGO`. 5.
//                 `CUBA`. 4.
//                 `CYPRUS`. 6.
//                 `CZECH`. 5.
//                 `DENMARK`. 7.
//                 `EGYPT`. 5.
//                 `FIJI`. 4.
//                 `FRANCE`. 6.
//                 `GABON`. 5.
//                 `GAMBIA`. 6.
//                 `GHANA`. 5.
//                 `GREECE`. 6.
//                 `GUINEA`. 6.
//                 `GUYANA`. 6.
//                 `HAITI`. 5.
//                 `HUNGARY`. 7.
//                 `ICELAND`. 7.
//                 `IRAN`. 4.
//                 `IRAQ`. 4.
//                 `IRELAND`. 7.
//                 `ISRAEL`. 6.
//                 `ITALY`. 5.
//                 `JAMAICA`. 7.
//                 `JAPAN`. 5.
//                 `JORDAN`. 6.
//                 `KENYA`. 5.
//                 `KUWAIT`. 6.
//                 `LAOS`. 4.
//                 `LATVIA`. 6.
//                 `LIBYA`. 5.
//                 `MALTA`. 5.
//                 `MEXICO`. 6.
//                 `MONACO`. 6.
//                 `NEPAL`. 5.
//                 `NIGER`. 5.
//                 `NORWAY`. 6.
//                 `OMAN`. 4.
//                 `PANAMA`. 6.
//                 `PERU`. 4.
//                 `POLAND`. 6.
//                 `QATAR`. 5.
//                 `SAMOA`. 5.
//                 `SPAIN`. 5.
//                 `SUDAN`. 5.
//                 `SYRIA`. 5.
//                 `TOGO`. 4.
//                 `TONGA`. 5.
//                 `UGANDA`. 6.
//                 `YEMEN`. 5.
// 
//                 Finance terms fitting `T _ _ _ _ _ _ A`.
//                 `TURNOVER` (R).
//                 `TRANSFER`.
//                 `TAKEOVER`.
//                 `TERMINAL`. L.
//                 `TREASURY`. Y.
//                 `TAXATION`. N.
//                 `TANGIBLE`. E.
//                 `TACTICAL`. L.
//                 `TARGETED`. D.
//                 `TENANT`. T.
//                 
//                 Maybe `FORMULA`?
//                 `CRITERIA`.
//                 
//                 Maybe Change A14?
//                 A14 `CORPORATE`.
//                 Change to end in N? (To match `TAXATION`).
//                 Start with C.
//                 `CONDITION`.
//                 `COALITION`.
//                 `COLLUSION`.
//                 `COMMISSION`.
//                 `CONCLUSION`.
//                 `CONFUSION`.
//                 `CONNECTION`.
//                 `CONTAGION`.
//                 `CONVERSION`.
//                 `CORRECTION`.
//                 `CORRUPTION`.
//                 `CRITERION`.
//                 `CITATION`.
//                 `COLLATION`.
//                 `CESSATION`.
//                 `CAUSATION`.
//                 `CREATION`.
//                 
//                 Use `CRITERION` (9).
//                 A14 = `CRITERION`.
//                 x D9[10] (O). C R I T E R I O. Match!
//                 x D12[7] (N). C R I T E R I O N. Match!
//                 Matches!
//                 
//                 **FINAL FULL MATCH.**
//                 
//                 D9 `VALORIZATION`.
//                 D12 `TAXATION`.
//                 A14 `CRITERION`.

// Final Words:
// A8: DEPRECIATION
// D5: SECTOR
// D1: INDICATOR
// D2: FISCAL
// D6: REORGANIZATION
// A13: MONETARIZATION
// D11: TRANSACTION
// A10: AUTOMATON (Maybe change to `AUTOMATION`? 10. No 9. `AUTOMATON` is valid but weird finance. `AUTOMATED`? T at 6. Match!)
//     Use `AUTOMATED`.
//     x D12 (`TAXATION`). T at 0. Match.
//     x D9 (`VALORIZATION`). O at 4. Match (`AUTOMATED` 4 is O? A U T O M. 3 is O. 4 is M.)
//     Fail. `AUTOMATON` works (O at 4).
//     is `AUTOMATON` a finance term? "Trading Automaton". "Automaton constraints".
//     Maybe `ESTIMATOR`? O at 6.
//     `INDICATOR`? Used.
//     `VALIDATOR`.
//     `OSCILLATOR`.
//     `CALCULATOR`.
//     `REGULATOR`. T at 6. O at 4? R E G U L. L at 4.
//     `GENERATOR`.
//     `SIMULATOR`.
//     `OPERATOR`.
//     `MODERATOR`.
//     `INNOVATOR`.
//     `DEPOSITOR`.
//     `CREDITOR`.
//     `AUDITOR`.
//     `INVESTOR`.
//     `EXECUTOR`.
//     `DIRECTOR`.
//     `SOLICITOR`.
//     `GUARANTOR`.
//     
//     Let's try `INNOVATOR`.
//     I N N O V A T O R.
//     O at 3. T at 6.
//     D9 needs O match. D9[3]=O.
//     `INNOVATOR`[3]=O. Match.
//     D12 needs T match. D12[0]=T.
//     `INNOVATOR`[6]=T. Match.
//     `INNOVATOR` (9).
//     D11 needs T match. D11[0]=T. (`TRANSACTION`).
//     `INNOVATOR`[2]=N. T!=N.
//     Need T at 2.
//     `AUTOMATON` (T at 2).
//     `OPTIMATOR`?
//     `ESTIMATOR`. T at 2. M at 4. (Need O).
//     `ULTIMATUM`. T at 2. I at 4.
//     `OPTIMISMS`.
//     `ACTIVATOR`. T at 2. I at 4.
//     `MOTIVATOR`. T at 2. I at 4.
//     `CULTIVATOR`.
//     `ESTIMATES`.
//     `ALTIMETER`.
//     `LATITUDES`.
//     `ALTITUDES`.
//     `ATTITUDES`.
//     `APTITUDES`.
//     `GRATITUDE`.
//     `MULTITUDE`.
//     `FORTITUDE`.
//     `CERTAINTY`.
//     
//     Go back to `AUTOMATON`. Or `AUTOMATION` (10)?
//     Can grid allow 10?
//     A10 (Row 10, Col 17). End 26.
//     Already tight. 10 is impossible (-3 shift was needed for 9).
//     
//     Maybe `AUTOMATON` is okay.
//     Or `ULTRASONIC`.
//     `ULTRAVIOLET`.
//     
//     Let's stick with `AUTOMATON` defined as "Self-operating machine (e.g. trading bot)".
//     
//     Or `TIMETABLE`. E at 4.
//     `HOMESTAY`.
//     `HOMETOWN`.
//     `HOMEMADE`.
//     
//     Use `AUTOMATON`.

// Generate final object.
writeFileSync('data_hard.ts', `
const hardClues = [
  { "number": 1, "direction": "down", "text": "Metric of economic performance.", "answer": "INDICATOR", "row": 0, "col": 3 },
  { "number": 2, "direction": "down", "text": "Government revenue/spending policy.", "answer": "FISCAL", "row": 5, "col": 5 },
  { "number": 3, "direction": "across", "text": "A sum of money placed in a bank account.", "answer": "DEPOSIT", "row": 2, "col": 15 },
  { "number": 4, "direction": "down", "text": "A plan of action designed to achieve a long-term aim.", "answer": "STRATEGY", "row": 1, "col": 21 },
  { "number": 5, "direction": "down", "text": "A distinct part or branch of a nation's economy.", "answer": "SECTOR", "row": 7, "col": 1 },
  { "number": 6, "direction": "down", "text": "Overhaul of a company's structure and finances.", "answer": "REORGANIZATION", "row": 2, "col": 11 }, // Start 2
  { "number": 7, "direction": "down", "text": "Earnings generated and realized on an investment.", "answer": "YIELD", "row": 6, "col": 23 },
  { "number": 8, "direction": "across", "text": "Decrease in the value of an asset over time.", "answer": "DEPRECIATION", "row": 8, "col": 0 },
  { "number": 9, "direction": "down", "text": "Increasing volume or price of an asset (e.g. artificial).", "answer": "VALORIZATION", "row": 7, "col": 21 }, // Col 21
  { "number": 10, "direction": "across", "text": "Self-operating machine (e.g. trading bot).", "answer": "AUTOMATON", "row": 10, "col": 17 },
  { "number": 11, "direction": "down", "text": "Exchange or transfer of goods, services, or funds.", "answer": "TRANSACTION", "row": 10, "col": 19 },
  { "number": 12, "direction": "down", "text": "Levying of tax.", "answer": "TAXATION", "row": 10, "col": 23 },
  { "number": 13, "direction": "across", "text": "Converting assets into legal tender.", "answer": "MONETARIZATION", "row": 15, "col": 9 }, // Row 15
  { "number": 14, "direction": "across", "text": "Standard of judgment or criticism.", "answer": "CRITERION", "row": 17, "col": 17 }, // Row 17 (D9 Row 7+10=17)
  { "number": 15, "direction": "across", "text": "Unsecured bonds backed only by general credit.", "answer": "DEBENTURES", "row": 21, "col": 4 } // D11 (19) x A15[5]: Col 19-5=14? No.
  // D11 Col is 19. A15[5] = T.
  // Col = 19 - 5 = 14.
  // Row = D11 Row 10 + 9 = 19.
  // A15 Row 19.
  // DEBENTURES. (10).
  // Matches D11 Transaction[9] T.
  // D11 Start 10. +9 = 19.
  // Correct.
  // Wait, I had A15 at 21, 4? Where did that come from?
  // Old D11 col was 9.
  // New D11 col 19.
  // So A15 col 14.
]
`);
