with open("sygnaly.txt", "r") as file:
    lines = file.readlines()

message = ""

#Zad 1

for i in range(39, len(lines), 40):
    word = lines[i].strip()
    message += word[9]

#Zad 2

max_unique = 0
word_max_unique = ""

for line in lines:
    word = line.strip()
    unique = len(set(word))
    if unique > max_unique:
        max_unique = unique
        word_max_unique = word

#Zad 3

valid_words = []

def is_valid_word(word):
    for i in range(len(word)):
        for j in range(i + 1, len(word)):
            if abs(ord(word[i]) - ord(word[j])) > 10:
                return False
    return True

for line in lines:
    word = line.strip()
    if is_valid_word(word):
        valid_words.append(word)


#Zapis

with open("wyniki4.txt", "w") as out:
    out.write("Zad.1\n")
    out.write(message + "\n")
    out.write("\n")
    out.write("Zad.2\n")
    out.write(f"{word_max_unique} {max_unique}\n")
    out.write("\n")
    out.write("Zad.3\n")
    out.write("\n".join(valid_words) + "\n")