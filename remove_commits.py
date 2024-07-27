import git_filter_repo as fr

class RemoveCommits(fr.Filter):
    def __init__(self, commit_messages):
        super().__init__()
        self.commit_messages = commit_messages

    def commit_callback(self, commit):
        message = commit.message.decode('utf-8').strip()
        if message in self.commit_messages:
            return None  # Skip the commit
        return commit

def main():
    commit_messages_to_remove = [
        "filtered"
    ]
    filter = RemoveCommits(commit_messages_to_remove)
    filter.run()

if __name__ == "__main__":
    main()
