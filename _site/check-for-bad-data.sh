#! /usr/bin/env bash

ERRORS="false"
ERR_TABS=0
ERR_NULLS=0

# if run with -m or m flagged, provide machine readable output
MACHINE=False
if [[ $1 == *"m"* ]]; then
  MACHINE=True;
fi

RED="\e[31m"
GREEN="\e[32m"
ENDCOLOR="\e[0m"

# when there are tab characters in the body of a story, the markdown
# gets interpreted as <pre>...</pre> and the story looks bad.
# this script checks for tabs in the body field of all stories.
# This can be run on the commmand line after updating data to look for any tabs.

jq .result[].body  ./_data/all-data.json | grep '\\t' | cut -c 1-50
TABS_IN_BODY=$(jq .result[].body  ./_data/all-data.json | grep '\\t' | wc -l | sed 's/^ *//g')
if [[ $TABS_IN_BODY -gt 0 ]]; then
    COLOR=$RED
    ERRORS="true"
    ERR_TABS=$TABS_IN_BODY
else
    COLOR=$GREEN
fi

if [[ $MACHINE != True ]]; then
    echo -e "${COLOR}Found $TABS_IN_BODY tabs in all-data.json 'body' fields. (We want this to be 0.)${ENDCOLOR}"
fi

# when there are null slugs in the person records, the whole site breaks.
# very bad; don't let it happen to you!

NULL_SLUGS=$(jq '.result[] | select(._type == "person") | .slug.current' _data/all-data.json | grep null | wc -l | sed 's/^ *//g')
if [[ $NULL_SLUGS -gt 0 ]]; then
    COLOR=$RED
    ERRORS="true"
    ERR_NULLS=$NULL_SLUGS
else
    COLOR=$GREEN
fi
if [[ $MACHINE != True ]]; then
    echo -e "${COLOR}Found $NULL_SLUGS null(missing) slugs in all-data.json person records. (We want this to be 0.)${ENDCOLOR}"
fi

if [[ $MACHINE = True ]]; then
    echo -e "{ \"errors\": \"${ERRORS}\", \"body_tabs\": ${ERR_TABS}, \"null_slugs\": ${ERR_NULLS} }"
fi