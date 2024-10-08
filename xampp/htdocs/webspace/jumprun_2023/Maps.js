// Alle Maps sind in einem Mehrdimensionalen Array, je nachdem welches level ausgewählt wurde wird dementsprechend auch eine andere map ausgewählt
// Mehrdimensionales Array "KARTEN" | code by Luis
const KARTEN = [] ;
			KARTEN[0] = [ // Level 1
			'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE', // 00
			'DDDDDDDDDDSSSDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD', // 00
			' Z                                               M', // 01
			' Z     T                BBB                      M', // 02
			'BBBBBBBBBBBBBBB                 PPP              M', // 03
			'         EEEEEEBB   PP                        PP M', // 04
			'         DEEEEEED    EP                          M', // 05
			'          DDDDDD         PPPPPPP   PPP           M', // 06
			'                                         PP    T M', // 07
			'                   M    T                     PP M', // 08
			'                   MPPPPPPP          PP          M', // 09
			'                   M                             M', // 10
			'BBBBBBBBBBBBBBBBBAABBBBBBBBBBBBBBBBBAAAABBBBBB   B', // 11
			'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEBBBE', // 12
			'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE', // 13
			'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE', // 14
			'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE', // 15
			'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE', // 16
		//	'01234567890123456789012345678901234567890123456789'
			] ;
			KARTEN[1] = [ // Level 2
			'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE', // 00
			'DDDDDDDDDDSSSDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD', // 00
			'                          Z                      M', // 01
			'                          Z          PP          M', // 02
			'      PP         T       PPP                     M', // 03
			'PP         PP    PP                           PP M', // 04
			'  PP                 PP                          M', // 05
			'       T                         T               M', // 06
			'       PP            PP          PP      PP    T M', // 07
			'                                              PP M', // 08
			'     PP      PP                                  M', // 09
			'BB   P                        BB          BB     M', // 10
			'EEBBBBBBBBBBBBBBBAABBBBBBBBBBBEEBBBBAAAABBEEBB   B', // 11
			'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEBBBE', // 12
			'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE', // 13
			'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE', // 14
			'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE', // 15
			'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE', // 16
		//	'01234567890123456789012345678901234567890123456789'
			] ;
			KARTEN[2] = [ // Level 3
			'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE', // 00
			'DDDDDDDDDDSSSDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD', // 00
			'                                                 M', // 01
			'Z            T                                   M', // 02
			'Z  PP     PPPPPPPPPPPPP        T                 M', // 03
			'PP      PP             PP     PP                 M', // 04
			'                                                 M', // 05
			'             T     PP      PP                    M', // 06
			'            PP       PPP  PPP                    M', // 07
			'              PPP                                M', // 08
			'          PP                                     M', // 09
			'                                                 M', // 10
			'BBBBBBBBAAAAABBBBAABBBAAAAAAAABBAABBAAAABBBBBB   B', // 11
			'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEBBBE', // 12
			'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE', // 13
			'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE', // 14
			'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE', // 15
			'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE', // 16
		//	'01234567890123456789012345678901234567890123456789'
			] ;
			KARTEN[3] = [ // Level 4
			'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE', // 00
			'DDDDDDDDDDSSSDDDDDDDDDDDDDPDDDDDDDDDDDDDDDDDDDDDDD', // 00
			'                          P                      M', // 01
			'                          P Z             T      M', // 02
			'                          P Z     PP     PPP     M', // 03
			'                          PPPPP     PP        PP M', // 04
			'               T          DDDDD                  M', // 05
			'             BBBBBBB                     T PP    M', // 06
			'            PE         PPP               PP      M', // 07
			'       BB   DE     PP                            M', // 08
			'       E     E           T        PPPPP          M', // 09
			'   BB  E     E         PPPPP        P            M', // 10
			'BBBEEAAEAAAAAEAAAAAAAAAAAAAAAAAAAAAAPAAABBAAAAAAAE', // 11
			'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE', // 12
			'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE', // 13
			'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE', // 14
			'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE', // 15
			'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE', // 16
		//	'01234567890123456789012345678901234567890123456789'
			] ;
			KARTEN[4] = [ // Level 5
			'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE', // 00
			'DDDDDDDDDDDDDDDDPDDDDDDDDDDDPDDDDDDDDDDDDDDPDDDDDD', // 00
			'                P           P              P      ', // 01
			'                P           P              P      ', // 02
			'       PP       P                T         P Z    ', // 03
			'        P       PP     PPP       PP        P Z    ', // 04
			'PP      P       P                        PPPPPP   ', // 05
			'P      TP       P           P                    P', // 06
			'P      PP       PP   T      P T                 T ', // 07
			'P       P       P   PP      PPP         PP     PP ', // 08
			'PP      P           P       P      PPP            ', // 09
			'P       P          PP       P                 BBBB', // 10
			'PAABBBAAPAAAAAAABBBBPBAAAAAAPBBBAAAAAAAAAAAAAAEEEE', // 11
			'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE', // 12
			'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE', // 13
			'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE', // 14
			'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE', // 15
			'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE', // 16
		//	'01234567890123456789012345678901234567890123456789'
			] ;
			KARTEN[5] = [ // Level 6 | Biom Wüste
			'UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU', // 00
			'OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO', // 00
			'                                                  ', // 01
			'                                                  ', // 02
			'                                                  ', // 03
			'                                                  ', // 04
			'                                                  ', // 05
			'                                                  ', // 06
			'            R                                     ', // 07
			'            R                                     ', // 08
			'      LLL   R                                Z    ', // 09
			'            R RRR RRR RRR RRR RRR RRR        Z    ', // 10
			'ÜÜÜÜÜÜÜÜÜÜÜÜÜÜÜÜÜÜÜÜÜÜÜÜÜÜÜÜÜÜÜÜÜÜÜÜÜÜÜÜÜÜÜÜÜÜÜÜÜÜ', // 11
			'UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU', // 12
			'UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU', // 13
			'UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU', // 14
			'UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU', // 15
			'UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU', // 16
		//	'01234567890123456789012345678901234567890123456789'
			] ;
			KARTEN[6] = [ // Level 7 | Biom Wüste
			'UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU', // 00
			'OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO', // 00
			'                                                  ', // 01
			'                                                  ', // 02
			'                                                  ', // 03
			'                                                  ', // 04
			'                                                  ', // 05
			'LLL      N                           LL           ', // 06
			'L        N                         LL             ', // 07
			'L        N                       LLZ              ', // 08
			'LLL      N                     LL  Z              ', // 09
			'L        N RRR      LL       LLLLLLLLL            ', // 10
			'ÜÜÜÜÜÜÜÜÜÜÜÜÜÜÜAAAAAAAAAAAAAAAAAAAAAAAAAAAAÜÜÜÜÜÜÜ', // 11
			'UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU', // 12
			'UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU', // 13
			'UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU', // 14
			'UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU', // 15
			'UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU', // 16
		//	'01234567890123456789012345678901234567890123456789'
			] ;
			KARTEN[7] = [ // Level 8 | Biom Wüste by Shania
			'UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU', // 00
			'OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO', // 00
			'                                                  ', // 01
			'            M         M   I                       ', // 02
			'            M         M L     L                   ', // 03
			'            M         M                   L    L  ', // 04
			'            M    LL   M                  L        ', // 05
			'            M                          L          ', // 06
			'            M                L        L           ', // 07
			'            M   I    L                            ', // 08
			'                     L  L         L               ', // 09
			'                L    L                            ', // 10
			'ÜÜÜÜÜAAAAAAAAAAAAAAAAALAAAAAAAAAAAAAAAAAAAAAZAAAAA', // 11
			'UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU', // 12
			'UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU', // 13
			'UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU', // 14
			'UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU', // 15
			'UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU', // 16
		//	'01234567890123456789012345678901234567890123456789'
			] ;
			KARTEN[8] = [ // Level 9 | Biom Wüste by Shania
			'UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU', // 00
			'OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO', // 00
			'        I                                         ', // 01
			'        L                                         ', // 02
			'              L   LLL                             ', // 03
			'                         L  LLLLL  LLLLLLLLLLLLL  ', // 04
			'    LLLLLLL              L                        ', // 05
			'  T                                               ', // 06
			'  Ü             LL                    R   R       ', // 07
			'    LLL L                   L       L R   R L     ', // 08
			'           LL         L               R   R       ', // 09
			'                         RRRRRRRRRRRRRRRZRRRRRRRRR', // 10
			'ÜÜÜÜÜÜRRRRRRRRRRRRRRRRRRRUUUUUUUUUUUUUUUUUUUUUUUUU', // 11
			'UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU', // 12
			'UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU', // 13
			'UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU', // 14
			'UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU', // 15
			'UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU', // 16
		//	'01234567890123456789012345678901234567890123456789'
			] ;
			KARTEN[9] = [ // Level 10 | Biom Wüste 
			'LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL', // 00
			'LL        LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL', // 00
			'                                                  ', // 01
			'     LLL                                          ', // 02
			'LLL            LLLLLLLL         L        LLLL     ', // 03
			'            LLLLL     L        LLL      L    LLL  ', // 04
			'         L      LL     L       LLL          I  L  ', // 05
			'LLL   L        LLI L  L  LLL  LLLLLLLLLLL  LLLLL  ', // 06
			'     LL        LLLL   LLL     LLLLLLL   L   L     ', // 07
			'      L             L                             ', // 08
			'LLLLLLLAALLLL     LL     LLLLLLLZ    LL           ', // 09
			'LLLLLLLLLLLLLLLLLLLLAALLLLLLLLLLZ  LLLLL          ', // 10
			'LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLAAALLLA  ', // 11
			'LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLAZ', // 12
			'LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL', // 13
			'LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL', // 14
			'LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL', // 15
			'LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL', // 16
		//	'01234567890123456789012345678901234567890123456789'
			] ;
			KARTEN[10] = [ // Level 11 | Biom Wasser
			'VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV', // 00
			'VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV', // 00
			'   SSSS   N  N        S  VVVVVVVVVVVVVVVVVVVVVVVVV', // 01
			'          N  N    Ä        VVVVVVVVVVVVVVVVVVVVVVV', // 02
			'          N  N               VVVVVVVVVVVVVVVVVVVVV', // 03
			'  Ä          N                 S  VVVVVVVVVVVVVVVV', // 04
			'             N                      SS  VVVVVVVVVV', // 05
			'                                          SSS  VVV', // 06
			'          N                                     ZV', // 07
			'          N  H                                  ZV', // 08
			'          N  N                    Ä     Q  QQ XXXV', // 09
			'       QQ N  N                         XXXXXXXVVVV', // 10
			'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXVVVVVVVVVVV', // 11
			'VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV', // 12
			'VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV', // 13
			'VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV', // 14
			'VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV', // 15
			'VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV', // 16
		//	'01234567890123456789012345678901234567890123456789'
			] ;
			KARTEN[11] = [ // Level 12 | Biom Wasser
			'VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV', // 00
			'VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV', // 00
			'VVVVVVVVVVVVVVVVVVVVV        H   Ä H       VVVVVVV', // 01
			'VVVVVVVVVVVVV      N                   H   H   H  ', // 02
			'VVVVVVVVVV N       N     N       H                ', // 03
			'VVVVVV     N   N   N     N  H         H    H   H  ', // 04
			'VVV    Ä   N   N   N Ä   N      H   H             ', // 05
			'VV         N   N   N     N    H          H    H   ', // 06
			'VV             N   N     N        H     H         ', // 07
			'VV           Ä N   N     N H       H      H       ', // 08
			'VVXXX          N         N     H      H      Z    ', // 09
			'VVVVVXXXXXXXXX N         N                   Z    ', // 10
			'VVVVVVVVVVVVVVXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', // 11
			'VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV', // 12
			'VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV', // 13
			'VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV', // 14
			'VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV', // 15
			'VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV', // 16
		//	'01234567890123456789012345678901234567890123456789'
			] ;
			KARTEN[12] = [ // Level 13 | Biom Wasser
			'VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV', // 00
			'VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV', // 00
			'VVVVVVVVVV      N                        VVVVVVVVV', // 01
			'                N    Ä                            ', // 02
			'                N      N             H            ', // 03
			'                N   H  N        Ä                 ', // 04
			'                N      N    H             H       ', // 05
			'                N H    N          H               ', // 06
			'                N    Ä N                          ', // 07
			'                N      N        H          Z      ', // 08
			'            H       H  N    Ä              Z   XXX', // 09
			'XXXXXXXXXX             N       QQ  QQQ   XXXXXXVVV', // 10
			'VVVVVVVVVVXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXVVVVVVVVV', // 11
			'VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV', // 12
			'VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV', // 13
			'VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV', // 14
			'VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV', // 15
			'VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV', // 16
		//	'01234567890123456789012345678901234567890123456789'
			] ;
			KARTEN[13] = [ // Level 14 | Biom Wasser
			'VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV', // 00
			'VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV', // 00
			'VVVVVV        N        H                    VVVVVV', // 01
			'VV            N  Ä                  Ä           VV', // 02
			'V             N     CCCCCCCCCCCCCCCCCCC    H     V', // 03
			'V             N          N      C                V', // 04
			'V             N     H    N     ZC                V', // 05
			'              N          N     ZC     H          V', // 06
			'              N          N    CCC                V', // 07
			'X             N   H      N                      XV', // 08
			'V        H               N                   XXXVV', // 09
			'VXXXXXX            QQQ   N            XXXXXXXVVVVV', // 10
			'VVVVVVVXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXVVVVVVVVVVVV', // 11
			'VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV', // 12
			'VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV', // 13
			'VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV', // 14
			'VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV', // 15
			'VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV', // 16
		//	'01234567890123456789012345678901234567890123456789'
			] ;
			KARTEN[14] = [ // Level 15 | Biom Wasser
			'VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV', // 00
			'VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV', // 00
			'                 VVVVVVVVVVVVVV                   ', // 01
			'                 VVVVVVVVVVVVVV                   ', // 02
			'                 VVVVVVVVVVVVVV                   ', // 03
			'                 SSSSSSSSSSSSSS                   ', // 04
			'             H                      Ä             ', // 05
			'                        H                         ', // 06
			'             Ä                   H                ', // 07
			'                 QQQQQQQQQQQQQQ                   ', // 08
			'                 VVVVVVVVVVVVVV       Ä      Z    ', // 09
			'                 VVVVVVVVVVVVVV              Z    ', // 10
			'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', // 11
			'VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV', // 12
			'VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV', // 13
			'VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV', // 14
			'VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV', // 15
			'VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV', // 16
		//	'01234567890123456789012345678901234567890123456789'
			] ;
			KARTEN[15] = [ // Level 16 | Biom Himmel
			'00000000000000000000000000000000000000000000000000', // 00
			'                                                  ', // 00
			'                                                  ', // 01
			'                                                  ', // 02
			'                                                  ', // 03
			'                                                  ', // 04
			'                                                  ', // 05
			'                                                  ', // 06
			'                                            Z     ', // 07
			'                                            Z     ', // 08
			'      ß               9                  666666   ', // 09
			'  000000        000???00   57    577              ', // 10
			'  00000000??                                      ', // 11
			'                                                  ', // 12
			'                                                  ', // 13
			'                                                  ', // 14
			'%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%', // 15
			'%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%', // 16
		//	'01234567890123456789012345678901234567890123456789'
			] ;
			KARTEN[16] = [ // Level 17 | Biom Himmel
			'00000000000000000000000000000000000000000000000000', // 00
			'                                                  ', // 00
			'                                                  ', // 01
			'         Z                                        ', // 02
			'         Z    ß                                   ', // 03
			'       666666666      9                           ', // 04
			'                     557                          ', // 05
			' ???                                              ', // 06
			'      ????                 57                     ', // 07
			'                                                  ', // 08
			'         ????              ß    57                ', // 09
			'                  9       5777                    ', // 10
			'                00000                             ', // 11
			'                                                  ', // 12
			'  000000000000                                    ', // 13
			'                                                  ', // 14
			'%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%', // 15
			'%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%', // 16
		//	'01234567890123456789012345678901234567890123456789'
			] ;
			KARTEN[17] = [ // Level 18 | Biom Himmel
			'00000000000000000000000000000000000000000000000000', // 00
			'                                                  ', // 00
			'                                                  ', // 01
			'  Z                                               ', // 02
			'  Z         9  ß                                  ', // 03
			'66666      000???000                              ', // 04
			'                         57      ß                ', // 05
			'                                666666            ', // 06
			'                                              9   ', // 07
			'                                           6666666', // 08
			'                                      9           ', // 09
			'                                     5777         ', // 10
			'                              57                  ', // 11
			'            ß          57                         ', // 12
			'666666666666666666                                ', // 13
			'                                                  ', // 14
			'%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%', // 15
			'%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%', // 16
		//	'01234567890123456789012345678901234567890123456789'
			] ;
			KARTEN[18] = [ // Level 19 | Biom Himmel
			'00000000000000000000000000000000000000000000000000', // 00
			'                                                  ', // 00
			'                                                  ', // 01
			'                                                  ', // 02
			'                                                  ', // 03
			'                                               Z  ', // 04
			'                                               Z  ', // 05
			'                                    ß      6666666', // 06
			'                                    57            ', // 07
			'                              57                  ', // 08
			'                        9                         ', // 09
			'                       57777                      ', // 10
			'          ß     57                   J            ', // 11
			'          57                      6666666         ', // 12
			' 666666                                           ', // 13
			'                                                  ', // 14
			'%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%', // 15
			'%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%', // 16
		//	'01234567890123456789012345678901234567890123456789'
			] ;
			KARTEN[19] = [ // Level 20 | Biom Himmel
			'00000000000000000000000000000000000000000000000000', // 00
			'                                                  ', // 00
			'                                                  ', // 01
			'                                     9    00000000', // 02
			'                                 00000000000000000', // 03
			'                         9 000??000000000000000000', // 04
			'                        000000??00000           00', // 05
			'                        000000???              Z 0', // 06
			'                       0000000?????  ß         Z 0', // 07
			'                 ß       00000000000000      66666', // 08
			'               00000         000000000000000000000', // 09
			'              000000000          00000000000000000', // 10
			'     0009        0000                  00000000000', // 11
			' 000000000                                        ', // 12
			'  000000                                          ', // 13
			'                                                  ', // 14
			'%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%', // 15
			'%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%', // 16
		//	'01234567890123456789012345678901234567890123456789'
			] ;
			KARTEN[20] = [ // Level 21 | Biom Hölle
			'33333333333333333333333333333333333333333333333333', // 00
			'33333333333333333333333333333333333333333333333333', // 00
			'                                                  ', // 01
			'                                                  ', // 02
			'                                                  ', // 03
			'                                                  ', // 04
			'                                                  ', // 05
			'                                                  ', // 06
			'                                                  ', // 07
			'             111     111111     11111             ', // 08
			'                                            Z     ', // 09
			'        111  88888888888888888 J            Z     ', // 10
			'44444444444444444444444444444444444444444444444444', // 11
			'33333333333333333333333333333333333333333333333333', // 12
			'33333333333333333333333333333333333333333333333333', // 13
			'33333333333333333333333333333333333333333333333333', // 14
			'33333333333333333333333333333333333333333333333333', // 15
			'33333333333333333333333333333333333333333333333333', // 16
		//	'01234567890123456789012345678901234567890123456789'
			] ;
			KARTEN[21] = [ // Level 22 | Biom Hölle
			'33333333333333333333333333333333333333333333333333', // 00
			'33333333333333333333333333333333333333333333333333', // 00
			'                                                  ', // 01
			'                                                  ', // 02
			'                                                  ', // 03
			'                                                  ', // 04
			'                              111                 ', // 05
			'                   111                            ', // 06
			'                        111                       ', // 07
			'               111               111              ', // 08
			'                                               Z  ', // 09
			'        11111        888888   J                Z  ', // 10
			'44444444444444444444444444444444AAAAAAAAA444444444', // 11
			'33333333333333333333333333333333333333333333333333', // 12
			'33333333333333333333333333333333333333333333333333', // 13
			'33333333333333333333333333333333333333333333333333', // 14
			'33333333333333333333333333333333333333333333333333', // 15
			'33333333333333333333333333333333333333333333333333', // 16
		//	'01234567890123456789012345678901234567890123456789'
			] ;
			KARTEN[22] = [ // Level 23 | Biom Hölle
			'33333333333333333333333333333333333333333333333333', // 00
			'33333333333333333333333333333333333333333333333333', // 00
			'                                                  ', // 01
			'                                                  ', // 02
			'                                                  ', // 03
			'                                                  ', // 04
			'                                                  ', // 05
			'                             1111111              ', // 06
			'                                                  ', // 07
			'               1111111   111                      ', // 08
			'                                              Z   ', // 09
			'      111111               J                  Z   ', // 10
			'44444444444444444AAAAAAAAAA1AAAAAAAAAAAA4444444444', // 11
			'33333333333333333333333333333333333333333333333333', // 12
			'33333333333333333333333333333333333333333333333333', // 13
			'33333333333333333333333333333333333333333333333333', // 14
			'33333333333333333333333333333333333333333333333333', // 15
			'33333333333333333333333333333333333333333333333333', // 16
		//	'01234567890123456789012345678901234567890123456789'
			] ;
			KARTEN[23] = [ // Level 24 | Biom Hölle
			'33333333333333333333333333333333333333333333333333', // 00
			'33333333333333333333333333333333333333333333333333', // 00
			'                                                  ', // 01
			'                                                  ', // 02
			'                                                  ', // 03
			'                                                  ', // 04
			'         1                                        ', // 05
			'        11                                        ', // 06
			'         1   1111111111111                        ', // 07
			'11       1                  1111                  ', // 08
			'1       11                         111       Z    ', // 09
			'1        1         J                         Z    ', // 10
			'4444444444444444444444444444AAAAAAAAAAAAA444444444', // 11
			'33333333333333333333333333333333333333333333333333', // 12
			'33333333333333333333333333333333333333333333333333', // 13
			'33333333333333333333333333333333333333333333333333', // 14
			'33333333333333333333333333333333333333333333333333', // 15
			'33333333333333333333333333333333333333333333333333', // 16
		//	'01234567890123456789012345678901234567890123456789'
			] ;
			KARTEN[24] = [ // Level 25 | Biom Hölle
			'33333333333333333333333333333333333333333333333333', // 00
			'33333333333333333333333333333333333333333333333333', // 00
			'                                                  ', // 01
			'                                                  ', // 02
			'11      111111                                    ', // 03
			'1       1                                         ', // 04
			'1      11         1111                            ', // 05
			'11      1                                         ', // 06
			'1       1     J          111                      ', // 07
			'1      11    111                                  ', // 08
			'11      1     1                 111         Z     ', // 09
			'1       1     1                             Z     ', // 10
			'44444444444444444AAAAAAAAAAAAAAAAAA444444444444444', // 11
			'33333333333333333333333333333333333333333333333333', // 12
			'33333333333333333333333333333333333333333333333333', // 13
			'33333333333333333333333333333333333333333333333333', // 14
			'33333333333333333333333333333333333333333333333333', // 15
			'33333333333333333333333333333333333333333333333333', // 16
		//	'01234567890123456789012345678901234567890123456789'
			] ;