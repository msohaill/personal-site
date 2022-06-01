#!/bin/bash

which brew
if [[ $? != 0 ]]
then
  echo brew not found. Please install brew.
  exit 1
fi

brew list jq &>/dev/null || brew install jq

gallerydir=src/assets/images/gallery/
imagedata=src/image-data.json

for file in "$@"
do
	if [ -f "$file" ] && [[ `echo "$file" | tr '[:upper:]' '[:lower:]'` =~ \.(jpe?g)$ ]]; then
		
		name=`basename "$file"`
		
		if [ -f "$gallerydir""$name" ]
		then
			echo -e "\033[31mError:\033[0m An image already exists with the name \033[4m\033[33m\"$name\"\033[0m. Please rename and try again."
		else
			echo -e "###### Input information for: \033[4m\033[33m\"$file\"\033[0m ######"

			while [[ -z "$caption" ]]
			do
				read -p "Enter a caption: " caption
				[[ -z "$caption" ]] && echo -e "\033[31mError:\033[0m Please input a valid caption."
			done
			
			while [[ -z "$location" ]]
			do
				read -p "Enter a location: " location
				[[ -z "$location" ]] && echo -e "\033[31mError:\033[0m Please input a valid location."
			done

			while [[ ! "$date" =~ (0[1-9]|[1-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-[0-9]{2} ]]
			do
				read -p "Enter a date (DD-MM-YY): " date
				[[ ! "$date" =~ (0[1-9]|[1-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-[0-9]{2} ]] &&
				echo -e "\033[31mError:\033[0m Please input a valid date in the form DD-MM-YY."
			done
			
			npx mozjpeg -optimize "$file" > "$gallerydir$name"

			jq '."'"$name"'" = {"caption":"'"$caption"'", "location":"'"$location"'", "date": "'"$date"'"}' \
			"$imagedata" > "$imagedata._"
			
			mv "$imagedata._" "$imagedata"

			unset name caption location date

			echo -e "\033[32m###### Successfully processed: \033[4m$file\033[24m ######\033[0m"
		fi		
	else
		echo -e "\033[31mError:\033[0m \033[4m\033[33m\"$file\"\033[0m is not a valid file."
	fi		
done    	

exit

