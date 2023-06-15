#!/bin/bash

gallerydir=src/static/images/gallery/
imagedata=src/static/data/images.yaml

for file in "$@"
do
	if [ -f "$file" ] && [[ `echo "$file" | tr '[:upper:]' '[:lower:]'` =~ \.(jpe?g)$ ]]; then

		name=`basename "$file" | perl -pe 's/([^.]*)$/\L\1/'`

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

			while [[ ! "$date" =~ [0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) ]]
			do
				read -p "Enter a date (YYYY-MM-DD): " date
				[[ ! "$date" =~ [0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) ]] &&
				echo -e "\033[31mError:\033[0m Please input a valid date in the form DD-MM-YY."
			done

			npx mozjpeg -optimize "$file" > "$gallerydir$name"

			echo -e "$name:\n  caption: $caption\n  location: $location\n  date: $date" >> "$imagedata"

			unset name caption location date

			echo -e "\033[32m###### Successfully processed: \033[4m$file\033[24m ######\033[0m"
		fi
	else
		echo -e "\033[31mError:\033[0m \033[4m\033[33m\"$file\"\033[0m is not a valid file."
	fi
done

exit
