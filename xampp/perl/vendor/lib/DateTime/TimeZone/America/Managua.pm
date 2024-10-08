# This file is auto-generated by the Perl DateTime Suite time zone
# code generator (0.08) This code generator comes with the
# DateTime::TimeZone module distribution in the tools/ directory

#
# Generated from /tmp/h6QqPsv6Ap/northamerica.  Olson data version 2020e
#
# Do not edit this file directly.
#
package DateTime::TimeZone::America::Managua;

use strict;
use warnings;
use namespace::autoclean;

our $VERSION = '2.46';

use Class::Singleton 1.03;
use DateTime::TimeZone;
use DateTime::TimeZone::OlsonDB;

@DateTime::TimeZone::America::Managua::ISA = ( 'Class::Singleton', 'DateTime::TimeZone' );

my $spans =
[
    [
DateTime::TimeZone::NEG_INFINITY, #    utc_start
59611182308, #      utc_end 1890-01-01 05:45:08 (Wed)
DateTime::TimeZone::NEG_INFINITY, #  local_start
59611161600, #    local_end 1890-01-01 00:00:00 (Wed)
-20708,
0,
'LMT',
    ],
    [
59611182308, #    utc_start 1890-01-01 05:45:08 (Wed)
61014577512, #      utc_end 1934-06-23 05:45:12 (Sat)
59611161596, #  local_start 1889-12-31 23:59:56 (Tue)
61014556800, #    local_end 1934-06-23 00:00:00 (Sat)
-20712,
0,
'MMT',
    ],
    [
61014577512, #    utc_start 1934-06-23 05:45:12 (Sat)
62240767200, #      utc_end 1973-05-01 06:00:00 (Tue)
61014555912, #  local_start 1934-06-22 23:45:12 (Fri)
62240745600, #    local_end 1973-05-01 00:00:00 (Tue)
-21600,
0,
'CST',
    ],
    [
62240767200, #    utc_start 1973-05-01 06:00:00 (Tue)
62297442000, #      utc_end 1975-02-16 05:00:00 (Sun)
62240749200, #  local_start 1973-05-01 01:00:00 (Tue)
62297424000, #    local_end 1975-02-16 00:00:00 (Sun)
-18000,
0,
'EST',
    ],
    [
62297442000, #    utc_start 1975-02-16 05:00:00 (Sun)
62426268000, #      utc_end 1979-03-18 06:00:00 (Sun)
62297420400, #  local_start 1975-02-15 23:00:00 (Sat)
62426246400, #    local_end 1979-03-18 00:00:00 (Sun)
-21600,
0,
'CST',
    ],
    [
62426268000, #    utc_start 1979-03-18 06:00:00 (Sun)
62434818000, #      utc_end 1979-06-25 05:00:00 (Mon)
62426250000, #  local_start 1979-03-18 01:00:00 (Sun)
62434800000, #    local_end 1979-06-25 00:00:00 (Mon)
-18000,
1,
'CDT',
    ],
    [
62434818000, #    utc_start 1979-06-25 05:00:00 (Mon)
62457717600, #      utc_end 1980-03-16 06:00:00 (Sun)
62434796400, #  local_start 1979-06-24 23:00:00 (Sun)
62457696000, #    local_end 1980-03-16 00:00:00 (Sun)
-21600,
0,
'CST',
    ],
    [
62457717600, #    utc_start 1980-03-16 06:00:00 (Sun)
62466267600, #      utc_end 1980-06-23 05:00:00 (Mon)
62457699600, #  local_start 1980-03-16 01:00:00 (Sun)
62466249600, #    local_end 1980-06-23 00:00:00 (Mon)
-18000,
1,
'CDT',
    ],
    [
62466267600, #    utc_start 1980-06-23 05:00:00 (Mon)
62829943200, #      utc_end 1992-01-01 10:00:00 (Wed)
62466246000, #  local_start 1980-06-22 23:00:00 (Sun)
62829921600, #    local_end 1992-01-01 04:00:00 (Wed)
-21600,
0,
'CST',
    ],
    [
62829943200, #    utc_start 1992-01-01 10:00:00 (Wed)
62852994000, #      utc_end 1992-09-24 05:00:00 (Thu)
62829925200, #  local_start 1992-01-01 05:00:00 (Wed)
62852976000, #    local_end 1992-09-24 00:00:00 (Thu)
-18000,
0,
'EST',
    ],
    [
62852994000, #    utc_start 1992-09-24 05:00:00 (Thu)
62861551200, #      utc_end 1993-01-01 06:00:00 (Fri)
62852972400, #  local_start 1992-09-23 23:00:00 (Wed)
62861529600, #    local_end 1993-01-01 00:00:00 (Fri)
-21600,
0,
'CST',
    ],
    [
62861551200, #    utc_start 1993-01-01 06:00:00 (Fri)
62987778000, #      utc_end 1997-01-01 05:00:00 (Wed)
62861533200, #  local_start 1993-01-01 01:00:00 (Fri)
62987760000, #    local_end 1997-01-01 00:00:00 (Wed)
-18000,
0,
'EST',
    ],
    [
62987778000, #    utc_start 1997-01-01 05:00:00 (Wed)
63248796000, #      utc_end 2005-04-10 06:00:00 (Sun)
62987756400, #  local_start 1996-12-31 23:00:00 (Tue)
63248774400, #    local_end 2005-04-10 00:00:00 (Sun)
-21600,
0,
'CST',
    ],
    [
63248796000, #    utc_start 2005-04-10 06:00:00 (Sun)
63263912400, #      utc_end 2005-10-02 05:00:00 (Sun)
63248778000, #  local_start 2005-04-10 01:00:00 (Sun)
63263894400, #    local_end 2005-10-02 00:00:00 (Sun)
-18000,
1,
'CDT',
    ],
    [
63263912400, #    utc_start 2005-10-02 05:00:00 (Sun)
63282067200, #      utc_end 2006-04-30 08:00:00 (Sun)
63263890800, #  local_start 2005-10-01 23:00:00 (Sat)
63282045600, #    local_end 2006-04-30 02:00:00 (Sun)
-21600,
0,
'CST',
    ],
    [
63282067200, #    utc_start 2006-04-30 08:00:00 (Sun)
63295365600, #      utc_end 2006-10-01 06:00:00 (Sun)
63282049200, #  local_start 2006-04-30 03:00:00 (Sun)
63295347600, #    local_end 2006-10-01 01:00:00 (Sun)
-18000,
1,
'CDT',
    ],
    [
63295365600, #    utc_start 2006-10-01 06:00:00 (Sun)
DateTime::TimeZone::INFINITY, #      utc_end
63295344000, #  local_start 2006-10-01 00:00:00 (Sun)
DateTime::TimeZone::INFINITY, #    local_end
-21600,
0,
'CST',
    ],
];

sub olson_version {'2020e'}

sub has_dst_changes {4}

sub _max_year {2030}

sub _new_instance {
    return shift->_init( @_, spans => $spans );
}



1;

