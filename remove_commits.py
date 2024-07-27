from git_filter_repo import Filter, Commit, Blob, Tag

class RemoveCommit(Filter):
    def __init__(self, commit_message):
        self.commit_message = commit_message

    def commit_filter(self, commit):
        if commit.message.decode('utf-8').strip() == self.commit_message:
            return None
        return commit

def main():
    commit_message_to_remove = "chore(bot): 👺 auto commit"
    filter = RemoveCommit(commit_message_to_remove)
    filter.run()

if __name__ == "__main__":
    main()
