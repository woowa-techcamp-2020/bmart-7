#! /bin/bash
if [ -z $BRANCH ]; then
    echo "Branch name is empty. Proceed with current branch."
else
    git checkout "$BRANCH"
    if [ $? != 0 ]; then
        echo "Branch $BRANCH is not exists."
        exit;
    fi
fi

git pull
pm2 restart bmart7

